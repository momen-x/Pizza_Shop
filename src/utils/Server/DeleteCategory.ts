"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteCategoryWithProducts = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  try {
    const existCategory = await prisma.category.findUnique({ where: { id } });

    if (!existCategory) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    // Delete all products in this category first (due to foreign key constraints)
    await prisma.product.deleteMany({
      where: { categoryId: id },
    });

    // Then delete the category
    await prisma.category.delete({ where: { id } });
    revalidatePath("/Admin/categorie");
    return {
      success: true,
      message: "Category and all associated products deleted successfully",
    };
  } catch (error) {
    console.error("Delete category error:", error);
    return {
      success: false,
      message: "Failed to delete category",
    };
  }
};
