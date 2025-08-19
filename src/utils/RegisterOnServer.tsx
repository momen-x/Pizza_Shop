"use server";
import { prisma } from "@/lib/prisma";
import { CreateAcountDto } from "./validation";
import bcrypt from "bcryptjs";

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
    console.log("from server : ", newUser);

    return { success: true, message: "Registration successful" };
  } catch {
    return { success: false, message: "An error occurred during registration" };
  }
};
