import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db } from "@/drizzle/src/index";
import { usersTable, gymsTable, clientsTable } from "@/drizzle/src/db/schema";
import { eq, and } from "drizzle-orm";

const JWT_SECRET = process.env.JWT_TOKEN!;
const GOOGLE_SECRET = process.env.GOOGLE_SECRET!;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!;
const REDIRECT_URI = process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI_CLIENT!;
const ROOT_DOMAIN = process.env.ROOT_DOMAIN!;
const COOKIE_SECURE = process.env.COOKIE_SECURE === "true";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const code = searchParams.get("code");
  const tenantSlug = searchParams.get("state"); // ← subdomain (gold)

  if (!code || !tenantSlug) {
    return NextResponse.json(
      { message: "Authorization code or tenant missing" },
      { status: 400 }
    );
  }

  try {
    /* 1. Exchange code for access token */
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

    /* 2. Get Google user info */
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

    /* 3. Find Gym by tenant slug */
    const gym = await db.query.gymsTable.findFirst({
      where: eq(gymsTable.slug, tenantSlug),
    });

    if (!gym || !gym.is_active) {
      return NextResponse.json(
        { message: "Invalid or inactive gym" },
        { status: 403 }
      );
    }

    /* 4. Find or create client */
    let client = await db.query.clientsTable.findFirst({
      where: and(
        eq(clientsTable.email, userInfo.email),
        eq(clientsTable.gym_id, gym.id)
      ),
    });

    if (!client) {
       return NextResponse.json(
        { message: "Client account not found" },
        { status: 403 }
      );
    }

    if (!client.is_active) {
      return NextResponse.json(
        { message: "Client account inactive" },
        { status: 403 }
      );
    }

    /* 5. Create JWT */
    const jwtPayload = {
      id: client.id,
      email: client.email,
      role: client.role,
      gym_id: gym.id,
      tenant: tenantSlug,
    };

    const token = jwt.sign(jwtPayload, JWT_SECRET, {
      expiresIn: "30d",
    });

    /* 6. Redirect back to tenant subdomain */
    const redirectUrl = `http://${tenantSlug}.${ROOT_DOMAIN}:3000/dashboard`;

    const response = NextResponse.redirect(redirectUrl);

    const isLocal = ROOT_DOMAIN === "localhost";

response.cookies.set("client-token", token, {
  httpOnly: true,
  secure: false,
  domain: isLocal ? undefined : `${tenantSlug}.${ROOT_DOMAIN}`,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  sameSite: "lax",
});


    return response;
  } catch (error) {
    console.error("Google OAuth client login error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
