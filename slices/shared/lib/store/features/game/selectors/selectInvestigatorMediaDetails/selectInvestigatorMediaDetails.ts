import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorDetails } from "../../game";
import { getMediaVariants } from "../../../../../../lib/features/game/media/getMediaVariants";
import { getMediaSkins } from "../../../../../features/game/media/getMediaSkins";

export const selectInvestigatorMediaDetails = createSelector(
  [
    selectCurrentInvestigatorDetails
  ],
  details => {
    if (!details) {
      return {
        skins: [],
        variants: []
      }
    }

    const variants = getMediaVariants(details);
    const skins = getMediaSkins(details);
    return {
      variants,
      skins
    }
  }
)