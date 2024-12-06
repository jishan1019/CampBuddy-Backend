import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FaqService } from "./faq.service";

const getAllFaq = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await FaqService.getAllFaqFromDB(query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "All Faq is retrieved successfully",
    data: result,
  });
});

const createFaq = catchAsync(async (req, res) => {
  const result = await FaqService.createFaqIntroDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq is create successfully",
    data: result,
  });
});

const updateFaq = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await FaqService.updateFaqIntroDb(_id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq is update successfully",
    data: result,
  });
});

const deleteFaq = catchAsync(async (req, res) => {
  const { _id } = req.params;
  const result = await FaqService.deleteSingleFaqFromDB(_id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Faq is delete successfully",
    data: result,
  });
});

export const FaqController = {
  getAllFaq,
  createFaq,
  updateFaq,
  deleteFaq,
};
