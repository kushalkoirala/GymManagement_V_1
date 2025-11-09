import jwt from "jsonwebtoken";

export interface TokenPayload {
  id: number;
  email: string;
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
  } catch {
    return null;
  }
}
