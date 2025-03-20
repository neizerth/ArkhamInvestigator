import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorDetails, selectInvestigatorMediaDetails, selectSelectedInvestigators } from "@shared/lib";
import { propEq } from "ramda";

export const selectCurrentDetails = createSelector(
  [
    selectCurrentInvestigatorDetails,
    selectInvestigatorMediaDetails,
    selectSelectedInvestigators
  ],
  (details, mediaDetails, investigators) => {
    const { skins, variants } = mediaDetails;
    const investigator = details?.investigator
      
    const selection = investigators.find(
      propEq(investigator?.code, 'code')
    )
  
    const skin = skins.find(
      propEq(selection?.skinId, 'value')
    ) || null;
  
    const variant = variants.find(
      propEq(selection?.variantId, 'value')
    ) || variants[0];

    return {
      investigator,
      
      skin,
      skins,

      variant,
      variants,

      selection
    }
  }
)