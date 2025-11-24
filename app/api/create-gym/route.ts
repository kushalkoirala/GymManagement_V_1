import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src";
import { gymsTable } from "@/drizzle/src/db/schema";

const JWT_SECRET = process.env.JWT_TOKEN!;

export async function POST(req: NextRequest) {
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

   // 3. Read body data
   const body = await req.json();
   const { name, slug } = body;

   if (!name || !slug) {
      return NextResponse.json(
        { message: "Name and slug are required" },
        { status: 400 }
      );
   }

   if (name.trim().trim() < 1 || name.trim().trim() > 50) {
      return NextResponse.json(
        { message: "Name must be between 1 and 50 characters" },
        { status: 400 }
      );
   }

   if (slug.trim().length < 1 || slug.trim().length> 50) {
      return NextResponse.json(
        { message: "Slug must be between 1 and 50 characters" },
        { status: 400 }
      );
   }

   // 4. Create gym
   const createGym = await db.insert(gymsTable).values({
      name: name.toLowerCase(),
      slug: slug.toLowerCase(),
      owner_id: decodedToken.id,
   }).returning();

   if (createGym.length === 0) {
      return NextResponse.json(
        { message: "Gym not created" },
        { status: 400 }
      );
   }

   // 5. Return response
   return NextResponse.json(
     { message: "Gym created successfully", gym: createGym[0] },
     { status: 201 }
   );   

  } catch (error) {
    console.error("Error in create-gym route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
