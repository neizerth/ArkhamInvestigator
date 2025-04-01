import {
	selectInvestigatorTranslations,
	translateInvestigator,
} from "@features/i18n";
import { createSelector } from "@reduxjs/toolkit";
import { FACTION_ORDER } from "@shared/config";
import { selectInvestigatorMedia, selectStories } from "@shared/lib";
import type { Faction, InvestigatorDetails, Story } from "@shared/model";
import type { Investigator as InvestigatorMedia } from "arkham-investigator-data";
import { ascend, isNotNil, prop, propEq, sortWith } from "ramda";

export const selectAvailableInvestigators = createSelector(
	[selectStories, selectInvestigatorMedia, selectInvestigatorTranslations],
	(
		stories: Story[],
		media: InvestigatorMedia[],
		translations,
	): InvestigatorDetails[] => {
		const codes = media.map(prop("code"));

		const mapStory = (story: Story) =>
			story.investigators.map((investigator) => ({
				investigator: translateInvestigator(investigator, translations),
				media: media.find(propEq(investigator.code, "code")),
				story,
				isOfficial: Boolean(story.is_canonical || story.is_official),
				alternate: [] as InvestigatorDetails[],
			}));

		const data = stories
			.flatMap(mapStory)
			.map((item, _, data) => {
				const { media } = item;

				if (!media?.variants) {
					return item;
				}

				const codes = media.variants
					.map((variant) => ("code" in variant ? variant.code : null))
					.filter(isNotNil);

				item.alternate = data.filter(({ investigator }) =>
					codes.includes(investigator.code),
				);
				return item;
			})
			.filter(({ investigator }) => codes.includes(investigator.code));

		return sortWith(
			[
				ascend(
					({ investigator }) =>
						FACTION_ORDER[investigator.faction_code as Faction],
				),
				ascend(({ investigator }) => investigator.code),
			],
			data,
		);
	},
);
