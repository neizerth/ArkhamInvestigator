import { createSelector } from "@reduxjs/toolkit";
import { getReferenceCardText } from "../../../logic";
import { selectShowReferenceBackText } from "../../stories";
import { selectReferenceCard } from "./selectReferenceCard";

export const selectReferenceCardText = createSelector(
	[selectReferenceCard, selectShowReferenceBackText],
	(card, showBack) => {
		return getReferenceCardText({ card, showBack });
	},
);
