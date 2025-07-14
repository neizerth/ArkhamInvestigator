import type { RootState } from "@shared/model";
import { propEq } from "ramda";
import { selectReferenceCardCode } from "../../stories";
import { selectStory } from "../selectStory";

export const selectReferenceCard = (state: RootState) => {
	const story = selectStory(state);
	const code = selectReferenceCardCode(state);
	if (!story || !code) {
		return;
	}
	const { referenceCards } = story;
	return referenceCards.find(propEq(code, "code"));
};
