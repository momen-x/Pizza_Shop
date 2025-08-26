"use server";

import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import { updatePasswordDto, UpdateUserData } from "../validation";
import { tokenName } from "../tokenName";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

interface ReturnUserData {
  success: boolean; // Fixed typo: "suucess" -> "success"
  message: string;
}

export const updateUserData = async (user: {
  name?: string;
  email?: string;
  imgURL?: string;
  id: string;
}): Promise<ReturnUserData> => {
  try {
    // Validate the input data
    const validation = UpdateUserData.safeParse(user);
    if (!validation.success) {
      console.error("Validation errors:", validation.error.issues);
      return {
        success: false,
        message: `Invalid data: ${validation.error.issues[0].message}`,
      };
    }

    // Get the existing user
    const existingUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    if (!existingUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // Prepare update data
    const updateData: {
      name?: string;
      email?: string;
      imgURL?: string;
      updatedAt: Date;
    } = {
      updatedAt: new Date(),
    };

    // Check if email is being updated and if it's different from current
    if (user.email && user.email !== existingUser.email) {
      const existEmailUser = await prisma.user.findUnique({
        where: { email: user.email },
      });

      if (existEmailUser && existEmailUser.id !== user.id) {
        return {
          success: false,
          message: "This email is already in use by another user",
        };
      }

      updateData.email = user.email;
    }

    // Check if name is being updated
    if (user.name && user.name !== existingUser.name) {
      updateData.name = user.name;
    }
    if (user.imgURL && user.name !== existingUser.image) {
      updateData.imgURL = user.imgURL;
    }

    // Only update if there are changes (besides updatedAt)
    const hasChanges = updateData.email || updateData.name;
    if (!hasChanges) {
      return {
        success: false,
        message: "No changes detected",
      };
    }

    // Update the user in database
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        image: true,
      },
    });

    // Create new JWT token with updated information
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error("JWT_SECRET is not defined");
    }

    const newToken = jwt.sign(
      {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.role === "ADMIN",
        imgURL: updatedUser.image,
      },
      jwtSecret,
      { expiresIn: "30d" }
    );

    // Update the cookie with new token
    const cookieStore = await cookies();
    cookieStore.set({
      name: tokenName,
      value: newToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax", // Changed from "strict" to "lax" for better compatibility
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: "/",
    });
    revalidatePath("/Admin/user");

    return {
      success: true,
      message: "User data updated successfully",
    };
  } catch (error) {
    console.error("Error updating user data:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
    };
  }
};

export const updateUserPassword = async (
  password: {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
  },
  id: string
): Promise<ReturnUserData> => {
  try {
    const isUser = await prisma.user.findUnique({ where: { id } });
    if (!isUser) {
      return {
        success: false,
        message: "this user is not exist",
      };
    }

    const validation = updatePasswordDto.safeParse(password);
    if (!validation.success) {
      return {
        success: false,
        message: "invaled data",
      };
    }

    if (password.newPassword !== password.confirmNewPassword) {
      return {
        success: false,
        message: "the new password and confirm password not match",
      };
    }
    if (password.oldPassword === password.newPassword) {
      return {
        success: false,
        message: "nothing change",
      };
    }

    const isMatchPassword = await bcrypt.compare(
      password.oldPassword,
      isUser.password
    );
    if (!isMatchPassword) {
      return {
        success: false,
        message: "it's the wrong password",
      };
    }

    const hashPassword = await bcrypt.hash(validation.data.newPassword, 12);

    await prisma.user.update({
      where: { id },
      data: {
        password: hashPassword,
      },
    });
    return {
      success: true,
      message: "password update successfully",
    };
  } catch {
    return {
      message: "Unexpected error",
      success: false,
    };
  }
};
