import { INVESTIGATORS_API_URL } from "../config";
import { APP_VERSION } from "../config/app";
import type { ImageSizeType } from "@shared/model";

export const getInvestigatorImageUrl = (
  code: string,
  type: ImageSizeType
) => {
  const format = 'jpg';
  const cache = `v=${APP_VERSION}`
  const url = `${INVESTIGATORS_API_URL}/images/${format}/${type}/${code}.${format}?${cache}`
  return url;
}