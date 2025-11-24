import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src";
import { usersTable } from "@/drizzle/src/db/schema";
import { eq } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_TOKEN!;
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN!;

// REGEX VALIDATION RULES
const nameRegex = /^[A-Za-z\s'-]+$/; // letters, spaces, apostrophe, hyphen
const phoneRegex = /^[0-9]{10}$/; // Indian 10-digit format (common case)

interface JwtUserPayload extends jwt.JwtPayload {
  id: number;
  email: string;
  first_name: string | null;
  last_name: string | null;
  phone_number: string | null;
  is_active: boolean;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Read cookie

    const token = req.cookies.get("access-token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Token missing" }, { status: 401 });
    }

    // 2. Verify token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtUserPayload;

    // 3. Read body data
    const body = await req.json();
    const { firstName, lastName, phoneNumber } = body;

    if (!firstName || !lastName || !phoneNumber) {
      return NextResponse.json(
        { message: "First name, last name, and phone number are required." },
        { status: 400 }
      );
    }

    // First name validation
    if (firstName.length < 2 || firstName.length > 50) {
      return NextResponse.json(
        { message: "First name must be between 2 and 50 characters." },
        { status: 400 }
      );
    }
    if (!nameRegex.test(firstName)) {
      return NextResponse.json(
        { message: "First name contains invalid characters." },
        { status: 400 }
      );
    }

    // Last name validation
    if (lastName.length < 2 || lastName.length > 50) {
      return NextResponse.json(
        { message: "Last name must be between 2 and 50 characters." },
        { status: 400 }
      );
    }
    if (!nameRegex.test(lastName)) {
      return NextResponse.json(
        { message: "Last name contains invalid characters." },
        { status: 400 }
      );
    }

    // Phone number validation (Indian 10-digit mobile format)
    if (!phoneRegex.test(phoneNumber)) {
      return NextResponse.json(
        { message: "Phone number must be a valid 10-digit number." },
        { status: 400 }
      );
    }

    // 4. Update user profile
    const updateUser = await db
      .update(usersTable)
      .set({
        first_name: firstName.toLowerCase(),
        last_name: lastName.toLowerCase(),
        phone_number: phoneNumber,
        is_active: true,
      })
      .where(eq(usersTable.id, decoded.id))
      .returning();

    if (!updateUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // 5. Generate new token
    const jwtPayload = {
      id: decoded.id,
      email: decoded.email,
      first_name: updateUser[0].first_name,
      last_name: updateUser[0].last_name,
      phone_number: updateUser[0].phone_number,
      is_active: updateUser[0].is_active,
    };

    const cookietoken = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "30d" });

    // 6. Set cookie
    const response = NextResponse.json(
      {
        message: "Profile updated successfully",
        user: updateUser[0],
      },
      {
        status: 201,
      }
    );
    
    response.cookies.set("access-token", cookietoken, {
      httpOnly: true,
      secure: true,
      domain: COOKIE_DOMAIN,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error) {
    console.error("Error in complete-profile route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
