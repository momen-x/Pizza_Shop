"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface returnData {
  success: boolean;
  message: string;
}

export const deleteUserByAdmin = async (id: string): Promise<returnData> => {



  try {
    const excitinguser = await prisma.user.findUnique({ where: { id } });
    if (!excitinguser) {
      return {
        success: false,
        message: "the user is not found",
      };
    }

    await prisma.user.delete({ where: { id } });
        revalidatePath("/Admin/user");
    
    return {
      success: true,
      message: "deleted successfully",
    };
  } catch {
    return {
      success: false,
      message: "unexpecteed error",
    };
  }
};
