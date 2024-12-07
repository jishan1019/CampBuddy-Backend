import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CategoryModel } from "./category.model";
import { TCategory } from "./category.interface";
import { CategorySearchableField } from "./category.constant";

const getAllCategoryFromDB = async (query: Record<string, unknown>) => {
  const CategoryQuery = new QueryBuilder(CategoryModel.find(), query)
    .search(CategorySearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await CategoryQuery.modelQuery;
  const meta = await CategoryQuery.countTotal();

  return {
    result,
    meta,
  };
};

const getSingleCategoryFromDB = async (_id: string) => {
  const result = await CategoryModel.findOne({ id: _id });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category Not Found");
  }

  return result;
};

const createCategoryIntroDb = async (payload: TCategory) => {
  const result = await CategoryModel.create(payload);

  if (result) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category create failed");
  }

  return result;
};

const updateCategoryIntroDb = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const result = await CategoryModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update Category");
  }

  return result;
};

const deleteSingleCategoryFromDB = async (id: string) => {
  const result = await CategoryModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  return null;
};

export const CategoryService = {
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  createCategoryIntroDb,
  updateCategoryIntroDb,
  deleteSingleCategoryFromDB,
};
