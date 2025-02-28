import { INVESTIGATORS_API_URL } from "@shared/config";
import { HAVE_AVIF_SUPPORT } from "@shared/config";
import type { ImageSizeType } from "@shared/model";

export const getInvestigatorImageUrl = (
  code: string,
  type: ImageSizeType
) => {
  const format = 'jpg';
  return `${INVESTIGATORS_API_URL}/images/${format}/${type}/${code}.${format}`;
}