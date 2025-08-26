"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { CreateAcountDto } from "../validation";
import { setCookie } from "../createToken";

interface returnRegister {
  success: boolean;
  message: string;
}
export const CheckRegester = async (user: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  city?: string;
  streetAddress?: string;
  postalCode?: string;
  country?: string;
}): Promise<returnRegister> => {
  const validation = CreateAcountDto.safeParse(user);
  if (!validation.success) {
    return { success: false, message: validation.error.issues[0].message };
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: user.email },
    });
    if (existingUser) {
      return { success: false, message: "this email alredy exist" };
    }

    const hashPassword = await bcrypt.hash(user.password, 12);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        password: hashPassword,
        name: user.name,
        phone: user.phone,
        streetAddress: user.streetAddress || null,
        postalCode: user.postalCode || null,
        city: user.city || null,
        country: user.country || null,
      },
    });

    const cookie = await cookies();
    const token = setCookie({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.role === "ADMIN",
      imgURL: newUser.image || "",
    });

    cookie.set({
      name: "auth-token", // or whatever your cookie name is
      value: await token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      // Add any other cookie options you need
      maxAge: 60 * 60 * 24 * 7, // 7 days (adjust as needed)
    });
    revalidatePath("/Admin/user");
    return { success: true, message: "Registration successful" };
  } catch {
    return { success: false, message: "An error occurred during registration" };
  }
};
