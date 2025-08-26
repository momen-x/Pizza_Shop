"use server";

import { prisma } from "@/lib/prisma";
import { AddCatogiry } from "../validation";
import { revalidatePath } from "next/cache";

interface Isucesses {
  success: boolean;
  message: string;
}
export async function AddNewCategories(cat: {
  name: string;
  description: string;
}): Promise<Isucesses> {
  try {
    const validation = AddCatogiry.safeParse(cat);
    if (!validation.success) {
      return {
        success: false,
        message: validation.error.issues[0].message,
      };
    }
    const category = await prisma.category.findUnique({
      where: { description: cat.description },
    });

    if (category) {
      return {
        success: false,
        message: "this category oredy exist",
      };
    }
    await prisma.category.create({
      data: {
        name: validation.data.name,
        description: validation.data.description,
      },
    });
    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/Admin/categorie");

    return {
      success: true,
      message: "success",
    };
  } catch {
    return {
      success: false,
      message: "error",
    };
  }
}
