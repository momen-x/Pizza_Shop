import { JwtPayload } from "@/types/jwt";
import jwt from "jsonwebtoken";

// Example of a proper setCookie function that should ONLY return the JWT token
export const setCookie = (payload: JwtPayload) => {
  // Make sure you have JWT_SECRET in your environment variables
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  // Create the JWT token
  const token = jwt.sign(payload, secret, {
    expiresIn: "30d", // or whatever expiration you want
    //   issuer: 'your-app-name' // optional
  });

  return token; // Return ONLY the token, not the full cookie string
};
