import { Request, Response } from "express";
import Tour, { CreateTourInput, UpdateTourInput } from "../models/tourModels";
import { ApiErrorResponse, ApiSuccessListResponse, ApiSuccessResponse } from "../types/api";

type TourParams = { id: string };
type CreateTourRequest = Request<Record<string, never>, unknown, CreateTourInput>;
type UpdateTourRequest = Request<TourParams, unknown, UpdateTourInput>;
type TourResponseData = {
  tour: unknown;
};
type ToursListResponse = ApiSuccessListResponse<{ tours: unknown[] }>;
type TourSingleResponse = ApiSuccessResponse<TourResponseData>;
type TourDeleteResponse = ApiSuccessResponse<{ data: null }>;

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Unexpected error";
};

export const getAllTours = async (
  _req: Request,
  res: Response<ToursListResponse | ApiErrorResponse>
): Promise<void> => {
  try {
    const tours = await Tour.find();
    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: "Data not found",
    });
  }
};

export const getTour = async (
  req: Request<TourParams>,
  res: Response<TourSingleResponse | ApiErrorResponse>
): Promise<void> => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(400).json({
      status: "fail",
      message: "Tour not found",
    });
  }
};

export const createTour = async (
  req: CreateTourRequest,
  res: Response<TourSingleResponse | ApiErrorResponse>
): Promise<void> => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        tour: newTour,
      },
    });
  } catch (error: unknown) {
    console.log(`Error ${getErrorMessage(error)}`);
    res.status(400).json({
      status: "fail",
      message: getErrorMessage(error),
    });
  }
};

export const updateTour = async (
  req: UpdateTourRequest,
  res: Response<TourSingleResponse | ApiErrorResponse>
): Promise<void> => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: "success",
      data: {
        tour,
      },
    });
  } catch (error: unknown) {
    console.log(error);
    res.status(404).json({
      status: "fail",
      message: getErrorMessage(error),
    });
  }
};

export const deleteTour = async (
  req: Request<TourParams>,
  res: Response<TourDeleteResponse | ApiErrorResponse>
): Promise<void> => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: "success",
      data: {
        data: null,
      },
    });
  } catch (error: unknown) {
    res.status(400).json({
      status: "fail",
      message: getErrorMessage(error),
    });
  }
};
