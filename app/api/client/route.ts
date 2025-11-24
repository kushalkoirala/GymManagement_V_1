import { NextResponse } from "next/server";
import { db } from "@/drizzle/src";
import { clientsTable, usersTable } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, phone_number } = body;

    // ⭐ FIX: cookies() must be awaited
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("userEmail")?.value;

    if (!userEmail) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const owner = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    const ownerData = owner[0];

    if (!ownerData) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    await db.insert(clientsTable).values({
      name,
      phone_number,
      tenant_id: ownerData.id,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("POST /api/client error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userEmail = cookieStore.get("userEmail")?.value;

    if (!userEmail) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const owner = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, userEmail))
      .limit(1);

    const ownerData = owner[0];

    if (!ownerData) {
      return NextResponse.json([], { status: 200 });
    }

    const clients = await db
      .select()
      .from(clientsTable)
      .where(eq(clientsTable.tenant_id, ownerData.id));

    return NextResponse.json(clients);
  } catch (err) {
    console.error("GET /api/client error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
