import { model, Schema } from "mongoose";
import { TFaq } from "./faq.interface";

const faqSchema = new Schema<TFaq>(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FaqModel = model<TFaq>("Faq", faqSchema);
