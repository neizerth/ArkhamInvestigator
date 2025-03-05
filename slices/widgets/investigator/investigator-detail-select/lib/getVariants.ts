import type { InvestigatorDetails, InvestigatorDetailItem } from "@shared/model";
import { getMediaVariantId } from "@shared/lib";

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
    name: media.variantName || details.story.name,
    type: 'default',
    icon: details.story.icon,
    value: null,
    details: details
  };

  const variants = media.variants.map((variant): InvestigatorDetailItem => {
    const { type, name } = variant;
    const id = getMediaVariantId(variant);

    const variantDetails = alternate.find(
        ({ investigator }) => investigator.code === id
      ) || details;

    const { story } = variantDetails; 
    const icon = story.icon === 'parallel' ? 'cardicons-parallel' : story.icon;

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
