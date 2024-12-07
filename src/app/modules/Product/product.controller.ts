import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProductService } from "./Product.service";

const getAllProduct = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await ProductService.getAllProductFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Product is retrieved successfully",
    data: result,
  });
});

const getSingleProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;

  const result = await ProductService.getSingleProductFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is retrieved successfully",
    data: result,
  });
});

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductService.createProductIntroDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is create successfully",
    data: result,
  });
});

const updateProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await ProductService.updateProductIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is update successfully",
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await ProductService.deleteSingleProductFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Product is delete successfully",
    data: result,
  });
});

export const ProductController = {
  getAllProduct,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
