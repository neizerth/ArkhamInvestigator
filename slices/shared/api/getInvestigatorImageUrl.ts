import { INVESTIGATORS_API_URL } from "@shared/config";
import { HAVE_AVIF_SUPPORT } from "@shared/config";

export const getInvestigatorImageUrl = (
  code: string,
  type: 'full' | 'mini' | 'square'
) => {
  const format = HAVE_AVIF_SUPPORT ? 'avif' : 'jpg';
  return `${INVESTIGATORS_API_URL}/images/${format}/${type}/${code}.${format}`;
}