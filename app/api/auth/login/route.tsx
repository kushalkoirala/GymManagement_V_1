import { pool } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return Response.json(
      { error: "Email and password required" },
      { status: 400 }
    );
  }

  try {
    const result = await pool.query("SELECT * FROM gyms WHERE email = $1", [
      email,
    ]);
    const user = result.rows[0];

    if (!user) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return Response.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return Response.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.error("Login error:", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
