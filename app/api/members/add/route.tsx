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
  const { name, email } = body;

  if (!name) {
    return Response.json({ error: "Member name is required" }, { status: 400 });
  }

  try {
    const result = await pool.query(
      "INSERT INTO members (gym_id, name, email) VALUES ($1, $2, $3) RETURNING *",
      [decoded.id, name, email || null]
    );

    return Response.json(
      { message: "Member added successfully", member: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add member error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
