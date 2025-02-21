import { createSelector } from "@reduxjs/toolkit";
import { selectCurrentInvestigatorDetails } from "@shared/lib";
import { getVariants } from "../getVariants";
import { getSkins } from "../getSkins";

export const selectInvestigatorMedia = createSelector(
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

    const variants = getVariants(details);
    const skins = getSkins(details);
    return {
      variants,
      skins
    }
  }
)