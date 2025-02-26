import { getMediaVariantId } from "@shared/lib";
import type { SelectedInvestigator } from "@shared/model";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { propEq } from "ramda";

export const getSelectedInvestigatorVariant = (
  { 
    code, 
    variantId, 
    skinId 
  }: SelectedInvestigator,
  { 
    image, 
    variants = [],
    skins = [],
    additionalAction = false 
  }: InvestigatorMedia
) => {
  const skin = skinId && 
    (
      skins.find(propEq(skinId, 'id')) || 
      variants.find(
        variant => getMediaVariantId(variant) === skinId
      )
    )

  const picture = {
    id: skinId || code,
    image: skin?.image || image
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
    image: skin?.image || variant.image || image
  }
  return {
    picture: variantPicture,
    additionalAction: variant.additionalAction || additionalAction,
    isParallel: variant.type === 'parallel'
  }
}