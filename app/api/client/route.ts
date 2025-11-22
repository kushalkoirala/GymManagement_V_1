import { NextResponse } from "next/server";
import { db } from "@/db";
import { clientsTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const body = await req.json();
  const { name, phone_number } = body;

  const userEmail = cookies().get("userEmail")?.value;

  if (!userEmail) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const owner = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, userEmail),
  });

  if (!owner) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  await db.insert(clientsTable).values({
    name,
    phone_number,
    tenant_id: owner.id,
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const userEmail = cookies().get("userEmail")?.value;

  if (!userEmail) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const owner = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, userEmail),
  });

  if (!owner) {
    return NextResponse.json({ error: "User Not Found" }, { status: 404 });
  }

  const clients = await db
    .select()
    .from(clientsTable)
    .where(eq(clientsTable.tenant_id, owner.id));

  return NextResponse.json(clients);
}
