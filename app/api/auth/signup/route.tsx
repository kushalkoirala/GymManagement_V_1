import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  if (!name || !email || !password) {
    return Response.json({ error: "All fields are required" }, { status: 400 });
  }

  try {
    const existing = await pool.query("SELECT * FROM gyms WHERE email = $1", [
      email,
    ]);
    if (existing.rows.length > 0) {
      return Response.json({ error: "Email already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await pool.query(
      "INSERT INTO gyms (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
      [name, email, hashedPassword]
    );

    return Response.json(
      { message: "Account created successfully", user: result.rows[0] },
      { status: 201 }
    );
  } catch (err) {
    console.error("Signup error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
