import { getMediaVariantId } from "@shared/lib";
import type { SelectedInvestigator } from "@shared/model";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";

export const getSelectedInvestigatorVariant = (
  { 
    code, 
    variantId, 
    skinId 
  }: SelectedInvestigator,
  { 
    image, 
    variants = [], 
    additionalAction = false 
  }: InvestigatorMedia
) => {
  const picture = {
    id: skinId || code,
    image
  }
  const defaultData = {
    picture,
    additionalAction
  }
  if (!variantId) {
    return defaultData;
  }

  const variant = variants.find(
    variant => getMediaVariantId(variant) === variantId
  )

  if (!variant) {
    return defaultData;
  }

  const id = getMediaVariantId(variant)
  const variantPicture = {
    id: skinId || id,
    image: variant.image || image
  }
  return {
    picture: variantPicture,
    additionalAction: variant.additionalAction || additionalAction
  }
}