import type { InvestigatorDetails } from "@shared/model";
import type { InvestigatorDetailItem } from "../model";
import { isNotNil } from "ramda";

export const getSkins = ({ media, story, investigator }: InvestigatorDetails) => {
  if (!media) {
    return [];
  }

  const { 
    variants = [], 
    skins = [] 
  } = media;   
  const { icon } = story;
  const { code } = media;

  const defaultSkin: InvestigatorDetailItem = {
    id: investigator.code,
    imageId: investigator.code,
    name: investigator.name,
    type: 'skin',
    value: null,
    investigator
  }

  const data = skins.map((skin): InvestigatorDetailItem => {
    const { id, name } = skin;
    
    return {
      id,
      imageId: id,
      value: id,
      name,
      type: 'skin',
      investigator
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
        investigator
      }
    })
    .filter(isNotNil)

  return [
    defaultSkin,
    ...data,
    ...variantSkins
  ]
} 