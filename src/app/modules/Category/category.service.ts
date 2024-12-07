import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CategoryModel } from "./category.model";
import { TCategory } from "./category.interface";
import { CategorySearchableField } from "./category.constant";
import { ProductModel } from "../Product/product.model";
import { WishListModel } from "../WishList/wishlist.model";
import mongoose from "mongoose";

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
    meta,
    result,
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
  const normalizedName = payload.name.trim().toLowerCase();

  const isExistCategory = await CategoryModel.findOne({
    name: normalizedName,
  });

  if (isExistCategory) {
    throw new AppError(httpStatus.BAD_REQUEST, "Category already exists");
  }

  payload.name = normalizedName;

  const result = await CategoryModel.create(payload);

  return result;
};

const updateCategoryIntroDb = async (
  id: string,
  payload: Partial<TCategory>
) => {
  const isExistCategory = await CategoryModel.findOne({ _id: id }).select(
    "name"
  );

  if (!isExistCategory) {
    throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  }

  if (payload?.name) {
    const normalizedName = payload?.name?.trim().toLowerCase();

    const isExistCategoryByName = await CategoryModel.findOne({
      name: normalizedName,
    }).select("name");

    if (isExistCategoryByName) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Category name already exists"
      );
    }

    payload.name = normalizedName;
  }

  const result = await CategoryModel.updateOne({ _id: id }, payload, {
    new: true,
  });

  return null;
};

import mongoose from "mongoose";
import { CategoryModel } from "../models/CategoryModel"; // Replace with actual paths
import { ProductModel } from "../models/ProductModel";
import { WishListModel } from "../models/WishListModel";
import AppError from "../utils/AppError"; // Replace with your error class path
import httpStatus from "http-status"; // Replace with your HTTP status utility if needed

export const deleteSingleCategoryFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const isExistCategory = await CategoryModel.findById(id).session(session);
    if (!isExistCategory) {
      throw new AppError(httpStatus.NOT_FOUND, "Category not found");
    }

    const allProductOnThisCategory = await ProductModel.find({
      category: id,
    })
      .select("_id")
      .session(session);

    const productIds = allProductOnThisCategory.map((product) => product._id);

    await ProductModel.deleteMany({ _id: { $in: productIds } }).session(
      session
    );

    await WishListModel.deleteMany({ product: { $in: productIds } }).session(
      session
    );

    await CategoryModel.deleteOne({ _id: id }).session(session);

    await session.commitTransaction();
    session.endSession();

    return null;
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();

    throw new AppError(httpStatus.BAD_REQUEST, error.message);
  }
};

export const CategoryService = {
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  createCategoryIntroDb,
  updateCategoryIntroDb,
  deleteSingleCategoryFromDB,
};
