import { JwtPayload } from "@/types/jwt";
import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { tokenName } from "./tokenName";

export function verifyToken(request: NextRequest): JwtPayload | null {
  try {
    const jwtToken = request.cookies.get(tokenName);
    const token = jwtToken?.value;
    if (!token) {
      return null;
    }
    const privateKey = process.env.JWT_SECRET || process.env.PRIVATE_KEY;
    if (!privateKey) {
      console.error("JWT secret key not found in environment variables");
      return null;
    }
    const userPayload = jwt.verify(token, privateKey) as JwtPayload;

    return userPayload;
  } 
  // @typescript-eslint/no-unused-vars
  catch (error) {
    return null;
  }
}
export function verifyTokenForPage(token: string): JwtPayload | null {
  try {
    if (!token) {
      return null;
    }
    const privateKey = process.env.JWT_SECRET;
    if (!privateKey) {
      return null;
    }

    const userPayload = jwt.verify(token, privateKey) as JwtPayload;

    return userPayload;
  } catch (error) {
    console.error("JWT verification failed:", error);
    return null;
  }
}
