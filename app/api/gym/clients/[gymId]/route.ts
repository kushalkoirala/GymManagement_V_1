import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src";
import { clientsTable, gymsTable } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_TOKEN!;

export async function GET(
  req: NextRequest,
  props: { params: Promise<{ gymId: string }> }
) {
  try {
    const params = await props.params;
    /* 1. Token */
    const token = req.cookies.get("access-token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    /* 2. Verify token */
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
        { message: "Not allowed to view clients" },
        { status: 403 }
      );
    }

    /* 3. Validate gymId */
    const gymId = Number(params.gymId);
    if (!gymId || isNaN(gymId)) {
      return NextResponse.json({ message: "Invalid gym id" }, { status: 400 });
    }

    /* 4. Check gym exists */
    const gym = await db
      .select()
      .from(gymsTable)
      .where(eq(gymsTable.id, gymId));

    if (gym.length === 0) {
      return NextResponse.json({ message: "Gym not found" }, { status: 404 });
    }

    /* 5. Fetch clients */
    const clients = await db
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.gym_id, gymId));

    return NextResponse.json(
      {
        message: "Clients fetched successfully",
        total: clients.length,
        clients,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Get clients error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
