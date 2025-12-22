import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src";
import { gymsTable } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_TOKEN!;

export async function GET(req: NextRequest) {
  try {
    // 1. Read cookie
    const token = req.cookies.get("access-token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "User is not logged in" },
        { status: 401 }
      );
    }

    // 2. Verify token
    const decodedToken = jwt.verify(token, JWT_SECRET) as {
      id: number;
      email: string;
      is_active: boolean;
    };

    if (!decodedToken.is_active) {
      return NextResponse.json(
        { message: "User is not active" },
        { status: 401 }
      );
    }

    // 3. Fetch gyms by owner_id
    const gyms = await db
      .select()
      .from(gymsTable)
      .where(eq(gymsTable.owner_id, decodedToken.id));

    // 4. Return response
    return NextResponse.json(
      {
        message: "Gyms fetched successfully",
        gyms,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in get-gyms route:", error);

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
