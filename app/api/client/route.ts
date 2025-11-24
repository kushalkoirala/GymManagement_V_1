import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { Client, Databases, ID } from "node-appwrite";
import jwt from "jsonwebtoken";

// -------------------------------
// Decode user from JWT
// -------------------------------
async function getUserFromJWT() {
  const cookieStore = await cookies();
  const token = cookieStore.get("access-token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    return decoded as {
      userId: string;
      email: string;
      name?: string;
      picture?: string;
    };
  } catch {
    return null;
  }
}

// -------------------------------
// Appwrite Client Setup
// -------------------------------
function appwrite() {
  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT!)
    .setProject(process.env.APPWRITE_PROJECT_ID!)
    .setKey(process.env.APPWRITE_API_KEY!);

  const databases = new Databases(client);

  return { databases };
}

// -------------------------------
// GET: Fetch all clients
// -------------------------------
export async function GET() {
  try {
    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    const { databases } = appwrite();

    const clients = await databases.listDocuments(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_CLIENT_COLLECTION_ID!,
      [
        // Filter by logged-in user
        // Query.equal("userId", user.userId)
      ]
    );

    return NextResponse.json({ success: true, data: clients });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}

// -------------------------------
// POST: Create a client
// -------------------------------
export async function POST(req: Request) {
  try {
    const user = await getUserFromJWT();
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized: Invalid or missing token" },
        { status: 401 }
      );
    }

    const { name, phone } = await req.json();

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const { databases } = appwrite();

    const doc = await databases.createDocument(
      process.env.APPWRITE_DATABASE_ID!,
      process.env.APPWRITE_CLIENT_COLLECTION_ID!,
      ID.unique(),
      {
        name,
        phone,
        userId: user.userId, // Save logged-in user reference
      }
    );

    return NextResponse.json({ success: true, data: doc }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Server error" },
      { status: 500 }
    );
  }
}
