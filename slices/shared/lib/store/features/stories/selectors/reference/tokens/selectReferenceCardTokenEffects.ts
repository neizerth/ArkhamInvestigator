import type { RootState } from "@shared/model";
import { selectShowReferenceBackText } from "../../../stories";
import { selectReferenceCard } from "../selectReferenceCard";

export const selectReferenceCardTokenEffects = (state: RootState) => {
	const card = selectReferenceCard(state);
	const showBack = selectShowReferenceBackText(state);
	if (!card) {
		return [];
	}
	return showBack ? card.back_reference : card.reference;
};
