import { INVESTIGATORS_API_URL } from "@shared/config";
import { HAVE_AVIF_SUPPORT } from "@shared/config";

export const getInvestigatorImageUrl = (
  code: string,
  type: 'full' | 'mini'
) => {
  const format = HAVE_AVIF_SUPPORT ? 'avif' : 'jpeg';
  return `${INVESTIGATORS_API_URL}/images/${format}/${type}/${code}.${format}`;
}