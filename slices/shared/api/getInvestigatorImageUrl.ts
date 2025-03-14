import { INVESTIGATORS_API_URL } from "@shared/config";
import { HAVE_AVIF_SUPPORT } from "@shared/config";
import { APP_VERSION } from "@shared/config/app";
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