import type { InvestigatorDetails } from "@shared/model";
import type { InvestigatorDetailItem } from "../model";

export const getSkins = ({ media, story, investigator }: InvestigatorDetails) => {
  if (!media?.skins) {
    return [];
  }
  
  const { icon } = story;
  const { code } = media;

  return media.skins.map((skin): InvestigatorDetailItem => {
    const { id, name } = skin;
    
    return {
      id,
      name,
      type: 'skin',
      icon,
      investigator
    }
  })
} 