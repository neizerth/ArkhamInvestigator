import type { InvestigatorDetails } from "@shared/model";
import type { InvestigatorDetailItem } from "../model";
import type { InvestigatorVariant } from "arkham-investigator-data";

const getVariantId = (variant: InvestigatorVariant) => {
  const { type } = variant;

  if (type === 'book') {
    return variant.code
  }
  if (type === 'parallel' && 'image' in variant) {
    return variant.code
  }
}

const getVariantDetails = (variantId: string, mainDetails: InvestigatorDetails) => {
  const { alternate, investigator } = mainDetails;
  const isMain = variantId === investigator.code;

  if (isMain) {
    return mainDetails;
  }

  const alternateDetails = alternate.find(
    ({ investigator }) => investigator.code === variantId
  )

  return alternateDetails || mainDetails;
}

export const getVariants = (details: InvestigatorDetails) => {
  const { media } = details;

  if (!media?.variants) {
    return [];
  }
  const { code } = media;
  return media.variants.map((variant): InvestigatorDetailItem => {
    const { type, name } = variant;
    const id = getVariantId(variant) || code;
    const variantDetails = getVariantDetails(id, details);

    const { investigator, story } = variantDetails; 
    const { icon } = story;
    
    return {
      id,
      name,
      type,
      icon,
      investigator
    }
  })
} 