import { createSelector } from "@reduxjs/toolkit";
import { getMediaVariants } from "../../../../../../lib/features/game/media/getMediaVariants";
import { getMediaSkins } from "../../../../../features/game/media/getMediaSkins";
import { selectCurrentInvestigatorDetails } from "../../game";

export const selectInvestigatorMediaDetails = createSelector(
	[selectCurrentInvestigatorDetails],
	(details) => {
		if (!details) {
			return {
				skins: [],
				variants: [],
			};
		}

		const variants = getMediaVariants(details);
		const skins = getMediaSkins(details);
		return {
			variants,
			skins,
		};
	},
);
