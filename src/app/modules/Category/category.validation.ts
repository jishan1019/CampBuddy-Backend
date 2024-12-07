import { z } from "zod";

export const categoryValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: "name is required." }),
    img: z.string({ required_error: "img is required." }),
    description: z.string({ required_error: "description is required." }),
  }),
});

export const updateCategoryValidationSchema =
  categoryValidationSchema.shape.body.partial();
