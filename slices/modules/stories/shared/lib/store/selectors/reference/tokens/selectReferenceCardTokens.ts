import { createSelector } from "@reduxjs/toolkit";
import { selectShowReferenceBackText } from "../../../stories";
import { selectReferenceCard } from "../selectReferenceCard";

export const selectReferenceCardTokens = createSelector(
	[selectReferenceCard, selectShowReferenceBackText],
	(card, showBack) => {
		if (!card) {
			return [];
		}

		return showBack ? card.back_tokens : card.tokens;
	},
);
