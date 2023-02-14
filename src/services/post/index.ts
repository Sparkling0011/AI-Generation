import Request from "../Request";
import { RequestOptions } from "../Request/type";
import { postResponse, postType } from "./type";

export const getAllPosts = (
  url: string,
  options?: RequestOptions
): Promise<postResponse> => {
  return Request.get<postResponse>(url, options);
};

export const uploadPost = (
  url: string,
  options: RequestOptions & { body: string }
) => {
  return Request.post<postResponse>(url, options);
};

export * from "./type";
