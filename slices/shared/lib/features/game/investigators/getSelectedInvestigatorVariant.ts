import { getMediaVariantId } from "../media/getMediaVariantId";
import type { InvestigatorDetails, SelectedInvestigator } from "@shared/model";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { propEq } from "ramda";
import { getMediaSkins, getMediaVariants } from "../media";

type Options = {
  selection: SelectedInvestigator
  media: InvestigatorMedia
  details: InvestigatorDetails
}
export const getSelectedInvestigatorOptions = ({
  selection,
  media,
  details
}: Options) => {
  const { 
    additionalAction = false 
  } = media;

  const { 
    code, 
    variantId, 
    skinId 
  } = selection;

  const skins = getMediaSkins(details);
  const variants = getMediaVariants(details);

  const skin = skins.find(propEq(skinId, 'id'));

  const picture = {
    id: skin?.imageId || code,
    image: skin?.image || media.image
  }

  const defaultData = {
    picture,
    additionalAction,
    isParallel: false
  }

  if (!variantId) {
    return defaultData;
  }

  
  const variant = variants.find(propEq(variantId, 'id'));

  const imageId = skin?.imageId || variant?.imageId || code;
  const image = skin?.image || variant?.image || media.image;

  const variantPicture = {
    id: imageId,
    image
  }
  
  return {
    picture: variantPicture,
    additionalAction: variant?.data?.additionalAction || additionalAction,
    isParallel: variant?.type === 'parallel'
  }
}