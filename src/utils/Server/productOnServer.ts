"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { AddNewProduct } from "../validation";

interface ReturnProduct {
  success: boolean;
  message: string;
}

// Updated interface to match your validation schema
export async function addNewProduct(productData: {
  name: string;
  description: string;
  imgUrl: string;
  size: ("SMALL" | "MEDIUM" | "LARGE")[]; // Array of size enums
  extras?: ("CHEESE" | "BACON" | "TOMATO" | "ONION" | "PEPPER")[]; // Array of extra enums
  category: string; // Category ID
  basePrice: number;
  // Add size prices mapping
  sizePrices: {
    SMALL?: number;
    MEDIUM?: number;
    LARGE?: number;
  };
  // Add extra prices mapping
  extraPrices?: {
    CHEESE?: number;
    BACON?: number;
    TOMATO?: number;
    ONION?: number;
    PEPPER?: number;
  };
}): Promise<ReturnProduct> {
  try {
    // Validate the input data
    const validation = AddNewProduct.safeParse({
      name: productData.name,
      description: productData.description,
      imgUrl: productData.imgUrl,
      size: productData.size,
      extras: productData.extras,
      category: productData.category,
      basePrice: productData.basePrice,
    });

    if (!validation.success) {
      console.error("Validation errors:", validation.error.issues);
      return {
        success: false,
        message: `Invalid data: ${validation.error.issues[0].message}`,
      };
    }

    // Check if product already exists
    const isExist = await prisma.product.findUnique({
      where: { name: validation.data.name },
    });

    if (isExist) {
      return {
        success: false,
        message: "This product already exists",
      };
    }

    // Verify category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: validation.data.category },
    });

    if (!categoryExists) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    // Create the product with related sizes and extras
    await prisma.product.create({
      data: {
        name: validation.data.name,
        basePrice: validation.data.basePrice,
        description: validation.data.description,
        image: validation.data.imgUrl,
        categoryId: validation.data.category,
        // Create sizes as nested relations
        sizes: {
          create: validation.data.size.map((sizeName) => ({
            name: sizeName, // Cast to your ProductSizes enum
            price: productData.sizePrices[sizeName] || 0,
          })),
        },
        // Create extras as nested relations (if provided)
        extras: validation.data.extras
          ? {
              create: validation.data.extras.map((extraName) => ({
                name: extraName, // Cast to your ExtraIngredients enum
                price: productData.extraPrices?.[extraName] || 0,
              })),
            }
          : undefined,
      },

      include: {
        sizes: true,
        extras: true,
        category: true,
      },
    });
    revalidatePath("/");
    revalidatePath("/menu");
    revalidatePath("/Admin/categorie");
    revalidatePath(`/Admin/categorie/${validation.data.category}`);
    // console.log("add");

    return {
      success: true,
      message: "Product added successfully",
    };
  } catch (error) {
    console.error("Error creating product:", error);
    return {
      success: false,
      message: "Unexpected error occurred",
    };
  }
}
