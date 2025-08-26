"use server";

import { prisma } from "@/lib/prisma";
import { updateCategories } from "../validation";
import { revalidatePath } from "next/cache";

interface returnData {
  success: boolean;
  message: string;
}
export const editCatogry = async (
  cat: {
    name: string;
    description: string;
  },
  id: string
): Promise<returnData> => {
  try {
    const validation = updateCategories.safeParse(cat);
    if (!validation) {
      return {
        success: false,
        message: "invalied data",
      };
    }
    const catogery = await prisma.category.findUnique({ where: { id } });

    if (!catogery) {
      return {
        success: false,
        message: "this categories not exist",
      };
    }

    await prisma.category.update({
      where: { id },
      data: {
        name: validation.data?.name,
        description: validation.data?.description,
      },
    });
    revalidatePath("/menu");
    revalidatePath("/");
    revalidatePath("/Admin/categorie");
    revalidatePath(`/Admin/categorie/${id}`);

    return { success: true, message: "updeted successfully" };
  } catch {
    return {
      success: false,
      message: "un expexted error",
    };
  }
};
