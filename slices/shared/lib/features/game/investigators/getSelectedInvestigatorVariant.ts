import { getMediaVariantId } from "../media";
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

  const skinImage = skin && 'image' in skin ? skin.image : null;

  const picture = {
    id: skinId || code,
    image: skinImage || image
  }

  const defaultData = {
    picture,
    additionalAction,
    isParallel: false
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
    id: skinId || variant.image ? id : code,
    image: skinImage || variant.image || image
  }

  return {
    picture: variantPicture,
    additionalAction: variant.additionalAction || additionalAction,
    isParallel: variant.type === 'parallel'
  }
}