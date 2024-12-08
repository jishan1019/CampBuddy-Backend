import { z } from "zod";
import { CartIncType } from "./cart.constant";

export const cartValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: "product is required." }),
  }),
});

export const updateCartValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: "product is required." }),
    cartIncType: z.enum([...CartIncType] as [string, ...string[]]),
  }),
});
