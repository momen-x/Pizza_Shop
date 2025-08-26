"use server";

import { prisma } from "@/lib/prisma";

interface IReturnAdminInfo {
  name: string;
  email: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  isAdmin: boolean;
}

export const showAdminData = async (id: string): Promise<IReturnAdminInfo> => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });

    if (user) {
      return {
        name: user?.name,
        email: user?.email,
        phone: user?.phone || "",
        streetAddress: user.streetAddress || "",
        postalCode: user.postalCode || "",
        city: user.city || "",
        country: user.country || "",
        isAdmin: user.role === "ADMIN",
      };
    } else {
      return {
        name: "",
        email: "",
        phone: "",
        streetAddress: "",
        postalCode: "",
        city: "",
        country: "",
        isAdmin: true,
      };
    }
  } catch {
    return {
      name: "",
      email: "",
      phone: "",
      streetAddress: "",
      postalCode: "",
      city: "",
      country: "",
      isAdmin: true,
    };
  }
};
