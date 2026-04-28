export type ApiStatus = "success" | "fail" | "error";

export type ApiErrorResponse = {
  status: Exclude<ApiStatus, "success">;
  message: string;
};

export type ApiSuccessResponse<TData> = {
  status: "success";
  data: TData;
};

export type ApiSuccessListResponse<TData> = ApiSuccessResponse<TData> & {
  results: number;
};
