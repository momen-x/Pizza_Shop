"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { LoginDto } from "../validation";
import { setCookie } from "../createToken";

interface LoginResponse {
  success: boolean;
  message: string;
  user?: {
    id: string;
    name: string;
  };
  status?: number;
}

export const CheckLogin = async (user: {
  email: string;
  password: string;
}): Promise<LoginResponse> => {
  try {
    // Validate input
    const validation = LoginDto.safeParse(user);
    if (!validation.success) {
      return {
        success: false,
        message: "Invalid input data",
        status: 400,
      };
    }

    // Check if user exists
    const existUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: {
        email: true,
        password: true,
        id: true,
        role: true,
        name: true,
        image: true,
      },
    });

    if (!existUser) {
      return {
        success: false,
        message: "Invalid email or password",
        status: 401,
      };
    }

    // Verify password
    const isPasswordMatch = await bcrypt.compare(
      user.password,
      existUser.password
    );

    if (!isPasswordMatch) {
      return {
        success: false,
        message: "Invalid email or password",
        status: 401,
      };
    }

    // Create and set cookie properly
    const cookieStore = await cookies();
    const token = setCookie({
      id: existUser.id,
      name: existUser.name,
      email: existUser.email,
      isAdmin: existUser.role === "ADMIN",
      imgURL: existUser.image || "",
    });

    // Set the cookie in the browser
    cookieStore.set({
      name: "auth-token", // or whatever your cookie name is
      value: await token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // Add any other cookie options you need
      maxAge: 60 * 60 * 24 * 7, // 7 days (adjust as needed)
    });

    return {
      success: true,
      message: "Authenticated",
      user: {
        id: existUser.id,
        name: existUser.name,
      },
      status: 200,
    };
  } catch (error) {
    console.error("Login error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      status: 500,
    };
  }
};
