import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { ProductModel } from "./product.model";
import { ProductSearchableField } from "./product.constant";
import { TProduct } from "./product.interface";
import { CategoryModel } from "../Category/category.model";

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const ProductQuery = new QueryBuilder(ProductModel.find(), query)
    .search(ProductSearchableField)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await ProductQuery.modelQuery;
  const meta = await ProductQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getSingleProductFromDB = async (_id: string) => {
  const result = await ProductModel.findOne({ _id: _id });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not Found");
  }

  return result;
};

const createProductIntroDb = async (payload: TProduct) => {
  const category = await CategoryModel.findOne({ _id: payload.category });

  if (!category) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product Category Not Found");
  }

  const result = await ProductModel.create(payload);

  return result;
};

const updateProductIntroDb = async (id: string, payload: Partial<TProduct>) => {
  if (payload?.category) {
    const category = await CategoryModel.findOne({ _id: payload?.category });

    if (!category) {
      throw new AppError(httpStatus.BAD_REQUEST, "Product Category Not Found");
    }
  }

  const result = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Failed to update Product");
  }

  return result;
};

const deleteSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  return null;
};

export const ProductService = {
  getAllProductFromDB,
  getSingleProductFromDB,
  createProductIntroDb,
  updateProductIntroDb,
  deleteSingleProductFromDB,
};
