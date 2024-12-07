import { z } from "zod";

export const wishlistValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: "product is required." }),
  }),
});
