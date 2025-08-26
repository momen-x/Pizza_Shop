"use server";
import { prisma } from "@/lib/prisma";
import { EditProductSchema } from "../validation";
import { ExtraIngredients, ProductSizes } from "@prisma/client";
import { revalidatePath } from "next/cache";

interface returnData {
  success: boolean;
  message: string;
}

interface ISizeOrExtra {
  name: string;
  price: number;
}

export const editProduct = async (
  product: {
    name?: string;
    description?: string;
    image?: string;
    sizes?: ISizeOrExtra[]; // Changed from size to sizes
    extras?: ISizeOrExtra[];
    basePrice?: number;
    category?: string;
  },
  id: string
): Promise<returnData> => {
  try {
    // Validate input
    const validationResult = EditProductSchema.safeParse(product);

    if (!validationResult.success) {
      const errorMessage = validationResult.error.issues
        .map((err) => `${err.path.join(".")}: ${err.message}`)
        .join(", ");

      return {
        success: false,
        message: `Validation failed: ${errorMessage}`,
      };
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id },
      include: { sizes: true, extras: true }, // Include related data
    });

    if (!existingProduct) {
      return {
        success: false,
        message: "Product not found",
      };
    }

    // Prepare update data for the product itself (non-relational fields)
    const updateData = {
      ...(product.name !== undefined && { name: product.name }),
      ...(product.description !== undefined && {
        description: product.description,
      }),
      ...(product.image !== undefined && { image: product.image }),
      ...(product.basePrice !== undefined && { basePrice: product.basePrice }),
      ...(product.category !== undefined && {
        category: {
          connect: { name: product.category }, // Connect to existing category by name
        },
      }),
    };

    // Update the product
    await prisma.product.update({
      where: { id },
      data: updateData,
    });

    // Handle sizes update if provided
    if (product.sizes !== undefined) {
      // First delete existing sizes
      await prisma.size.deleteMany({
        where: { productId: id },
      });

      // Then create new sizes
      if (product.sizes.length > 0) {
        await prisma.size.createMany({
          data: product.sizes.map((size) => ({
            name: size.name as ProductSizes, // Cast to the enum type
            price: size.price,
            productId: id,
          })),
        });
      }
    }

    // Handle extras update if provided
    if (product.extras !== undefined) {
      // First delete existing extras
      await prisma.extra.deleteMany({
        where: { productId: id },
      });

      if (product.extras.length > 0) {
        await prisma.extra.createMany({
          data: product.extras.map((extra) => ({
            name: extra.name as ExtraIngredients, // Cast to the enum type
            price: extra.price,
            productId: id,
          })),
        });
      }
    }
    revalidatePath("/menu");
    revalidatePath("/");
    revalidatePath("/Admin/products");
    revalidatePath(`/Admin/products/${id}`);
    return {
      success: true,
      message: "Product updated successfully",
    };
  } catch (error) {
    console.error("Error updating product:", error);

    return {
      success: false,
      message: "Failed to update product. Please try again.",
    };
  }
};
