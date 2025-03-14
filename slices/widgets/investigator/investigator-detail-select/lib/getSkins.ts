import type { InvestigatorDetails, InvestigatorDetailItem } from "@shared/model";
import { isNotNil } from "ramda";

export const getSkins = (details: InvestigatorDetails) => {
  const { media, story, investigator } = details;

  if (!media) {
    return [];
  }

  const { 
    variants = [], 
    skins = [] 
  } = media;
  const { code } = media;

  const defaultSkin: InvestigatorDetailItem = {
    id: investigator.code,
    imageId: investigator.code,
    name: story.name,
    type: 'skin',
    value: code,
    details
  }

  const data = skins.map((skin): InvestigatorDetailItem => {
    const { id, name } = skin;
    
    return {
      id,
      imageId: id,
      value: id,
      name,
      type: 'skin',
      details
    }
  })

  const variantSkins = variants.map(
    (variant): InvestigatorDetailItem | null => {
      if (!('image' in variant)) {
        return null;
      }
      const id = 'code' in variant ? variant.code : code;
      const { name } = variant;
      
      return {
        id,
        imageId: id,
        value: id,
        name,
        type: 'skin',
        details
      }
    })
    .filter(isNotNil)

  return [
    defaultSkin,
    ...data,
    ...variantSkins
  ]
} 