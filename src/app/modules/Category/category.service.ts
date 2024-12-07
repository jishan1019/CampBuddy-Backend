import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CategoryModel } from "./category.model";
import { TCategory } from "./category.interface";
import { CategorySearchableField } from "./category.constant";
import { ProductModel } from "../Product/product.model";
import { WishListModel } from "../WishList/wishlist.model";

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

const deleteSingleCategoryFromDB = async (id: string) => {
  const productDeleteResult = await ProductModel.deleteMany({ category: id });

  console.log(productDeleteResult);

  // const wishListProductDeleteResult = await WishListModel.deleteMany({
  //   product: id,
  // });

  // const result = await CategoryModel.findByIdAndDelete(id);

  // if (!result) {
  //   throw new AppError(httpStatus.NOT_FOUND, "Category not found");
  // }

  return null;
};

export const CategoryService = {
  getAllCategoryFromDB,
  getSingleCategoryFromDB,
  createCategoryIntroDb,
  updateCategoryIntroDb,
  deleteSingleCategoryFromDB,
};
