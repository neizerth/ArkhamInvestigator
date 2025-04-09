import { createSelector } from "@reduxjs/toolkit";
import { getMediaSkins, getMediaVariants } from "../../../../../features";
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
