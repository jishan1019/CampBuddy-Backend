import { z } from "zod";

export const productValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required." }),
    price: z.number({ required_error: "price is required." }).min(1),
    description: z.string({ required_error: "description is required." }),
    category: z.string({ required_error: "category is required." }),
    images: z.array(z.string({ required_error: "images is required." })),
    stockQuantity: z.number({ required_error: "stockQuantity is required." }),
  }),
});

export const updateProductValidationSchema =
  productValidationSchema.shape.body.partial();
