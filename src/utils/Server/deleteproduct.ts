"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: string) => {
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new Error("this product is not exsist");
    }
    revalidatePath("/Admin/products");
    revalidatePath("/menu");
    revalidatePath("/");

    await prisma.product.delete({ where: { id } });
  } catch (error) {
    console.log(error);
  }
};
