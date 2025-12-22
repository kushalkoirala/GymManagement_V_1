import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src";
import { clientsTable, gymsTable } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_TOKEN!;

const nameRegex = /^[A-Za-z\s'-]{1,50}$/;
const phoneRegex = /^[0-9]{10}$/;

export async function POST(req: NextRequest) {
  try {
    /* 1. Token */
    const token = req.cookies.get("access-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* 2. Verify */
    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: string;
      is_active: boolean;
    };

    if (!decoded.is_active) {
      return NextResponse.json({ message: "User inactive" }, { status: 403 });
    }

    if (decoded.role !== "GYM_OWNER" && decoded.role !== "GYM_STAFF") {
      return NextResponse.json(
        { message: "Not allowed to create clients" },
        { status: 403 }
      );
    }

    /* 3. Body */
    const { gym_id, email, name, phone_number } = await req.json();

    if (!gym_id || !name) {
      return NextResponse.json(
        { message: "Gym ID and name are required" },
        { status: 400 }
      );
    }

    if (!nameRegex.test(name.trim())) {
      return NextResponse.json(
        { message: "Invalid client name" },
        { status: 400 }
      );
    }

    if (phone_number && !phoneRegex.test(phone_number)) {
      return NextResponse.json(
        { message: "Invalid phone number" },
        { status: 400 }
      );
    }

    /* 4. Insert client */
    const client = await db
      .insert(clientsTable)
      .values({
        email,
        gym_id,
        name: name.trim(),
        phone_number,
      })
      .returning();

    return NextResponse.json(
      { message: "Client created successfully", client: client[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Create client error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
