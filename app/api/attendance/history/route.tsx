import { pool } from "@/lib/db";
import { verifyToken } from "@/lib/auth";

export async function GET(req: Request) {
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

  const { searchParams } = new URL(req.url);
  const member_id = searchParams.get("member_id");
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  try {
    let query = "";
    let params: any[] = [];

    if (member_id) {
      query = `
        SELECT * FROM attendance 
        WHERE member_id = $1 
        ${from && to ? "AND date BETWEEN $2 AND $3" : ""}
        ORDER BY date DESC
      `;
      params = from && to ? [member_id, from, to] : [member_id];
    } else {
      query = `
        SELECT a.*, m.name AS member_name 
        FROM attendance a
        JOIN members m ON a.member_id = m.id
        WHERE m.gym_id = $1
        ${from && to ? "AND a.date BETWEEN $2 AND $3" : ""}
        ORDER BY a.date DESC
      `;
      params = from && to ? [decoded.id, from, to] : [decoded.id];
    }

    const result = await pool.query(query, params);
    return Response.json(
      { message: "Attendance fetched", records: result.rows },
      { status: 200 }
    );
  } catch (err) {
    console.error("History error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
