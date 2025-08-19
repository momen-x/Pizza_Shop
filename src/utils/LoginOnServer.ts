"use server";

import { prisma } from "@/lib/prisma";
import { LoginDto } from "./validation";
import bcrypt from "bcryptjs";

interface returnUser {
  success: boolean;
  message: string;
}

export const CheckLogin = async (user: {
  email: string;
  password: string;
}): Promise<returnUser> => {
  try {
    const validation = LoginDto.safeParse(user);
    if (!validation.success) {
      return { success: false, message: "inputs faild" };
    }
    const existUser = await prisma.user.findUnique({
      where: { email: user.email },
      select: {
        email: true,
        password: true,
      },
    });

    //toDo check from hash password user
    if (!existUser) {
      return { success: false, message: "invalid email or password" };
    }

    const isPasswordMatch = await bcrypt.compare(
      user.password,
      existUser.password
    );

    if (!isPasswordMatch) {
      return { success: false, message: "invalid email or password" };
    }

    return { success: true, message: "Authentication" };
    //toDo now he can save token and move to home page
  } catch {
    return { success: false, message: "error" };
  }
};
