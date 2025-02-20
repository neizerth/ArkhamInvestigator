import type { InvestigatorDetails } from "@shared/model";
import type { InvestigatorDetailItem } from "../model";
import type { InvestigatorVariant } from "arkham-investigator-data";

export const getVariants = (details: InvestigatorDetails) => {
  const { 
    media, 
    alternate
  } = details;

  if (!media?.variants) {
    return [];
  }
  const { code } = media;

  const mainVariant: InvestigatorDetailItem = {
    id: code,
    imageId: code,
    name: details.story.name,
    type: 'default',
    icon: details.story.icon,
    value: null,
    details: details
  };

  const variants = media.variants.map((variant): InvestigatorDetailItem => {
    const { type, name } = variant;
    const id = 'code' in variant ? variant.code : code;

    const variantDetails = alternate.find(
        ({ investigator }) => investigator.code === id
      ) || details;

    const { story } = variantDetails; 
    const { icon } = story;

    const imageId = 'image' in variant ? id : code;
    
    return {
      id,
      value: id,
      imageId,
      name,
      type,
      icon,
      details: variantDetails
    }
  });

  return [
    mainVariant,
   ...variants,
  ]
} 
