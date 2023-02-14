import { RequestOptions } from "../Request/type";
import Request from "../Request";
import { answerResponse, genImgParams, genImgResponse } from "./type";

export const generateImageByDesc = (
  url: string,
  options: RequestOptions & { body: string }
) => {
  return Request.post<genImgResponse>(url, options);
};

export const postPrompt = (
  url: string,
  options: RequestOptions & {
    body: string;
  }
) => {
  return Request.post<answerResponse>(url, options);
};
