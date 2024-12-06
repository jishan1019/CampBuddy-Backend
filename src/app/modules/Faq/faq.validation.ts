import { z } from "zod";

export const faqValidationSchema = z.object({
  body: z.object({
    question: z.string({ required_error: "question is required." }),
    answer: z.string({ required_error: "Email is required." }).email(),
  }),
});

export const updateFaqValidationSchema =
  faqValidationSchema.shape.body.partial();