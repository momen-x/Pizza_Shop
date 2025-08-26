"use server";

import { prisma } from "@/lib/prisma";
import { updateAdminInfo } from "../validation";
import { revalidatePath } from "next/cache";

interface ReturnData {
  success: boolean;
  message: string;
}

export const updateAdminInformation = async (
  admin: {
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
): Promise<ReturnData> => {
  try {
    const validation = updateAdminInfo.safeParse(admin);
    if (!validation.success) {
      return { 
        success: false, 
        message: validation.error.issues.map(e => e.message).join(", ") 
      };
    }

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return { success: false, message: "User not found" };
    }

    // Allow only admins to edit other admins?
    if (user.role !== "ADMIN") {
      return { success: false, message: "Unauthorized access" };
    }

    await prisma.user.update({
      where: { id },
      data: {
        name: admin.name,
        email: admin.email,
        phone: admin.phone,
        streetAddress: admin.streetAddress,
        postalCode: admin.postalCode,
        city: admin.city,
        country: admin.country,
        role: admin.isAdmin ? "ADMIN" : "USER",
      },
    });

    revalidatePath("/Admin/user");
    return { success: true, message: "Updated successfully" };

  } catch (error) {
    console.error("Update error:", error);
    return { success: false, message: "Unexpected error occurred" };
  }
};