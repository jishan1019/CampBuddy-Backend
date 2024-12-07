import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { CategoryService } from "./category.service";

const getAllCategory = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await CategoryService.getAllCategoryFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Category is retrieved successfully",
    data: result,
  });
});

const getSingleCategory = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const result = await CategoryService.getSingleCategoryFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is retrieved successfully",
    data: result,
  });
});

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryService.createCategoryIntroDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is create successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await CategoryService.updateCategoryIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is update successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await CategoryService.deleteSingleCategoryFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Category is delete successfully",
    data: result,
  });
});

export const CategoryController = {
  getAllCategory,
  getSingleCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
