import { pool } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    return Response.json({ error: "No token provided" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return Response.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }

  const body = await req.json();
  const { member_id, age, weight, goal, diet_type } = body;

  if (!member_id || !age || !weight || !goal) {
    return Response.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const member = await pool.query(
      "SELECT * FROM members WHERE id = $1 AND gym_id = $2",
      [member_id, decoded.id]
    );

    if (member.rows.length === 0) {
      return Response.json({ error: "Member not found" }, { status: 404 });
    }

    const prompt = `
      Create a 7-day ${
        diet_type || "balanced"
      } diet plan for a ${age}-year-old weighing ${weight}kg who wants to ${goal}.
      Include breakfast, lunch, dinner, and snacks.
    `;

    const response = await fetch("https://api.gorg.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GORG_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gorg-large",
        messages: [
          { role: "system", content: "You are a nutrition expert." },
          { role: "user", content: prompt },
        ],
      }),
    });

    const data = await response.json();
    const plan =
      data?.choices?.[0]?.message?.content || "No diet plan generated.";

    const result = await pool.query(
      "INSERT INTO diet_plans (member_id, plan) VALUES ($1, $2) RETURNING *",
      [member_id, plan]
    );

    return Response.json(
      {
        message: "Diet plan generated successfully",
        diet_plan: result.rows[0],
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Diet error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
