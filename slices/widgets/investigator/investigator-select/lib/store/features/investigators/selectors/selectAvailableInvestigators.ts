import { createSelector } from "@reduxjs/toolkit";
import { selectInvestigatorMedia, selectStories } from "@shared/lib";
import type { InvestigatorDetails, Story } from "@shared/model";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { ascend, prop, propEq, sortWith } from "ramda";

export const selectAvailableInvestigators = createSelector(
  [
    selectStories,
    selectInvestigatorMedia
  ],
  (stories: Story[], media: InvestigatorMedia[]): InvestigatorDetails[] => {
    const codes = media.map(prop('code'));

    const mapStory = (story: Story) => 
      story.investigators.map(investigator => ({
        investigator,
        media: media.find(
          propEq(investigator.code, 'code')
        ),
        story,
      })
    )

    const data = stories
      .flatMap(mapStory)
      .filter(
        ({ investigator }) => codes.includes(investigator.code)
      )
    
    return sortWith(
      [
        ascend(({ investigator }) => investigator.faction_code),
        ascend(({ investigator }) => investigator.code),
      ],
      data
    )
  }
);