import { Request, Response } from "express";
import { ApiErrorResponse } from "../types/api";

type UserParams = { id: string };

export const getAllUsers = (_req: Request, res: Response<ApiErrorResponse>): void => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const createUser = (_req: Request, res: Response<ApiErrorResponse>): void => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const getUser = (_req: Request<UserParams>, res: Response<ApiErrorResponse>): void => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const updateUser = (_req: Request<UserParams>, res: Response<ApiErrorResponse>): void => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const deleteUser = (_req: Request<UserParams>, res: Response<ApiErrorResponse>): void => {
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};
