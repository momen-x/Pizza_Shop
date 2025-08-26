import { z } from "zod";

export const CreateAcountDto = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "the password must be more than 6 characters")
    .max(50),
  name: z.string().min(5, "the name must be at lest 5 characters").max(50),
  phone: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const LoginDto = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "the password must be more than 6 characters")
    .max(50),
});

export const AddCatogiry = z.object({
  name: z.string().min(3, "the name must be at lest 3 characters").max(100),
  description: z
    .string()
    .min(5, "the description must be at lest 5 characters")
    .max(300),
});

export const AddNewProduct = z.object({
  name: z.string().min(3, "The name must be at least 3 characters").max(150),
  description: z
    .string()
    .min(10, "The description must be at least 10 characters")
    .max(400),
  imgUrl: z.string(),
  size: z
    .array(z.enum(["SMALL", "MEDIUM", "LARGE"]))
    .min(1, "At least one size must be selected")
    .refine((sizes) => new Set(sizes).size === sizes.length, {
      message: "Duplicate sizes are not allowed",
    }),
  extras: z
    .array(z.enum(["CHEESE", "BACON", "TOMATO", "ONION", "PEPPER"]))
    .optional()
    .refine((extras) => !extras || new Set(extras).size === extras.length, {
      message: "Duplicate extras are not allowed",
    }),
  category: z.string(),
  basePrice: z.number().positive("Base price must be positive"),
});

// Additional validation for the complete product data including prices
export const CompleteProductData = z.object({
  name: z.string().min(3).max(150),
  description: z.string().min(10).max(400),
  imgUrl: z.string().url(),
  size: z.array(z.enum(["SMALL", "MEDIUM", "LARGE"])).min(1),
  extras: z
    .array(z.enum(["CHEESE", "BACON", "TOMATO", "ONION", "PEPPER"]))
    .optional(),
  category: z.string().cuid(),
  basePrice: z.number().positive(),
  sizePrices: z.object({
    SMALL: z.number().nonnegative().optional(),
    MEDIUM: z.number().nonnegative().optional(),
    LARGE: z.number().nonnegative().optional(),
  }),
  extraPrices: z
    .object({
      CHEESE: z.number().nonnegative().optional(),
      BACON: z.number().nonnegative().optional(),
      TOMATO: z.number().nonnegative().optional(),
      ONION: z.number().nonnegative().optional(),
      PEPPER: z.number().nonnegative().optional(),
    })
    .optional(),
});

export const UpdateUserData = z
  .object({
    id: z.string(),
    name: z
      .string()
      .min(5, "Name must be at least 2 characters")
      .max(50, "Name must be less than 100 characters")
      .optional(),
    imgUrl: z.string().optional(),
    email: z
      .email("Invalid email format")
      .max(255, "Email must be less than 255 characters")
      .optional(),
  })
  .refine((data) => data.name !== undefined || data.email !== undefined, {
    message: "At least one field (name or email) must be provided for update",
    path: ["name"], // This will show the error on the name field
  });

export const deleteAcountDto = z.object({
  password: z.string().min(6, "the password must be at lest 6 characters "),
});

export const updatePasswordDto = z.object({
  oldPassword: z.string().min(6),
  newPassword: z.string().min(6),
  confirmNewPassword: z.string().min(6),
});

export const updateAdminInfo = z.object({
  name: z.string().min(5).max(50).optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isAdmin: z.boolean().optional(),
});

export const updateCategories = z.object({
  name: z.string().min(5, "the name must be at lest 5 characters").max(150),
  description: z
    .string()
    .min(10, "the description must be at lest 10 characters")
    .max(500),
});

export const updateUserByAdminInfo = z.object({
  name: z.string().min(5).max(50).optional(),
  email: z.email().optional(),
  phone: z.string().optional(),
  streetAddress: z.string().optional(),
  postalCode: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
  isAdmin: z.boolean().optional(),
});


export const EditProductSchema = z
  .object({
    name: z
      .string()
      .min(3, "The name must be at least 3 characters")
      .max(150)
      .optional(),
    description: z
      .string()
      .min(10, "The description must be at least 10 characters")
      .max(400)
      .optional(),
    image: z.string().optional(), // Changed from imgUrl to image
    sizes: z // Changed from size to sizes to match server function
      .array(
        z.object({
          name: z.enum(["SMALL", "MEDIUM", "LARGE"]),
          price: z.number().nonnegative("Size price must be positive or zero"),
        })
      )
      .min(1, "At least one size must be selected")
      .refine(
        (sizes) => new Set(sizes.map(s => s.name)).size === sizes.length,
        {
          message: "Duplicate sizes are not allowed",
        }
      )
      .optional(),
    extras: z
      .array(
        z.object({
          name: z.enum(["CHEESE", "BACON", "TOMATO", "ONION", "PEPPER"]),
          price: z.number().min(0, "Extra price must be non-negative"),
        })
      )
      .refine(
        (extras) => !extras || new Set(extras.map(e => e.name)).size === extras.length,
        {
          message: "Duplicate extras are not allowed",
        }
      )
      .optional(),
    category: z.string().optional(),
    basePrice: z.number().positive("Base price must be positive").optional(),
  })
  .refine(
    (data) => {
      // At least one field should be provided for editing
      return Object.values(data).some((value) => value !== undefined);
    },
    {
      message: "At least one field must be provided for editing",
      path: ["root"],
    }
  );

export interface ICategory {
  createdAt: Date;
  description: string;
  id: string;
  name: string;
  order: number;
  updatedAt: Date;
}
