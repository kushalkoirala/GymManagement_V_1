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
  const { member_id } = body;

  if (!member_id) {
    return Response.json({ error: "member_id is required" }, { status: 400 });
  }

  try {
    const today = new Date().toISOString().split("T")[0];

    const exists = await pool.query(
      "SELECT * FROM attendance WHERE member_id = $1 AND date = $2",
      [member_id, today]
    );

    if (exists.rows.length > 0) {
      return Response.json(
        { error: "Attendance already marked for today" },
        { status: 400 }
      );
    }

    const result = await pool.query(
      "INSERT INTO attendance (member_id, date, status) VALUES ($1, $2, $3) RETURNING *",
      [member_id, today, "present"]
    );

    return Response.json(
      { message: "Attendance marked successfully", attendance: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Attendance error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
