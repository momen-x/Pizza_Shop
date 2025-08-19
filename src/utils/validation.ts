import { z } from "zod";

export const CreateAcountDto = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, "the password must be more than 6 characters")
    .max(50),
  name: z.string(),
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
