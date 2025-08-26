"use server";

import { prisma } from "@/lib/prisma";
import { updateUserByAdminInfo } from "../validation";

interface retun {
  success: boolean;
  message: string;
}

export const UpdateUserByAdmin = async (
  userData: {
    name?: string;
    email?: string;
    phone?: string;
    streetAddress?: string;
    postalCode?: string;
    city?: string;
    country?: string;
    isAdmin?: boolean;
  },
  id: string
): Promise<retun> => {
  const validation = updateUserByAdminInfo.safeParse(userData);
  if (!validation.success) {
    return {
      success: false,
      message: "invalid data",
    };
  }
  const existUser = await prisma.user.findUnique({ where: { id } });
  if (!existUser) {
    return {
      success: false,
      message: "this user not found",
    };
  }
  await prisma.user.update({
    where: { id },
    data: {
      name: validation.data.name || existUser.name,
      email: validation.data.email || existUser.email,

      phone: validation.data.phone || existUser.phone,
      streetAddress: validation.data.streetAddress || existUser.streetAddress,
      postalCode: validation.data.postalCode || existUser.postalCode,
      city: validation.data.city || existUser.city,
      country: validation.data.country || existUser.country,
      role: validation.data.isAdmin ? "ADMIN" : "USER",
    },
  });
  return {
    success: true,
    message: "upduted successfully",
  };
};
