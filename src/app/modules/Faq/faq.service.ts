import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { FaqModel } from "./faq.model";
import { TFaq } from "./faq.interface";

const getAllFaqFromDB = async (query: Record<string, unknown>) => {
  const FaqQuery = new QueryBuilder(FaqModel.find(), query)
    .search([])
    .filter()
    .sort()
    .fields();

  const result = await FaqQuery.modelQuery;

  return result;
};

const createFaqIntroDb = async (payload: TFaq) => {
  const faqCount = await FaqModel.countDocuments();

  if (faqCount > 10) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Can't create faq more then 10 please delete faq and try again"
    );
  }

  const result = await FaqModel.create(payload);

  return result;
};

const updateFaqIntroDb = async (id: string, payload: Partial<TFaq>) => {
  const result = await FaqModel.findByIdAndUpdate(id, payload, { new: true });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update faq");
  }

  return result;
};

const deleteSingleFaqFromDB = async (id: string) => {
  const result = await FaqModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Faq not found");
  }

  return null;
};

export const FaqService = {
  getAllFaqFromDB,
  createFaqIntroDb,
  updateFaqIntroDb,
  deleteSingleFaqFromDB,
};
