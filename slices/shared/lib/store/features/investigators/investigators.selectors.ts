import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorMedia } from "./investigatorMedia";
import type { Story } from "@shared/model";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { selectStories } from "../stories";
import { prop } from "ramda";
import { propIncludes } from "@shared/lib/util";

export const selectAvailableInvestigators = createSelector(
  [
    selectStories,
    selectInvestigatorMedia
  ],
  (stories: Story[], media: InvestigatorMedia[]) => {
    const codes = media.map(prop('code'));

    return stories
      .flatMap(prop('investigators'))
      .filter(propIncludes('code', codes))
  }
);