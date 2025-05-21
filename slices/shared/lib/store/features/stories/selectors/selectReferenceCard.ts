import { createSelector } from "@reduxjs/toolkit";
import { propEq } from "ramda";
import { selectReferenceCardCode } from "../stories";
import { selectStory } from "./selectStory";

export const selectReferenceCard = createSelector(
	[selectStory, selectReferenceCardCode],
	(story, code) => {
		if (!story || !code) {
			return;
		}

		const { referenceCards } = story;

		return referenceCards.find(propEq(code, "code"));
	},
);
