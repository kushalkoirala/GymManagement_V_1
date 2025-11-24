import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src/index";
import { usersTable } from "@/drizzle/src/db/schema";

const JWT_SECRET = process.env.JWT_TOKEN!;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI!;
const COOKIE_DOMAIN = process.env.COOKIE_DOMAIN!;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { message: "Authorization code required" },
      { status: 400 }
    );
  }

  try {
    // 1. Exchange code for access token
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_SECRET,
        redirect_uri: REDIRECT_URI,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenData.access_token) {
      return NextResponse.json(
        { message: "Access token not found" },
        { status: 400 }
      );
    }

    // 2. Get user info
    const userInfoRes = await fetch(
      "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=" +
        tokenData.access_token
    );
    const userInfo = await userInfoRes.json();

    if (!userInfo.email) {
      return NextResponse.json(
        { message: "User email not found" },
        { status: 400 }
      );
    }

    // 3. Save into database

    const insertUser = await db
      .insert(usersTable)
      .values({
        email: userInfo.email,
      })
      .onConflictDoUpdate({
        target: usersTable.email,
        set: {
          // NO-OP update — does NOT write anything
          email: usersTable.email,
        },
      })
      .returning();

    const user = insertUser[0];

    // 4. CHECK PROFILE COMPLETENESS
    const isProfileComplete =
      user.first_name && user.last_name && user.phone_number && user.is_active;

    const jwtPayload = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      is_active: user.is_active,
    };

    const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: "30d" });

    if (!isProfileComplete) {
      const response = NextResponse.redirect(`${BASE_URL}/complete-profile`);
      response.cookies.set("access-token", token, {
        httpOnly: true,
        secure: true,
        domain: COOKIE_DOMAIN,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    } else {
      const response = NextResponse.redirect(`${BASE_URL}/dashboard`);
      response.cookies.set("access-token", token, {
        httpOnly: true,
        secure: true,
        domain: COOKIE_DOMAIN,
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
      });
      return response;
    }
  } catch (error) {
    console.error("Error in callback route:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
