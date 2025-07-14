import type { RootState } from "@shared/model";
import { selectSelectedInvestigators } from "../game";
import { selectReplaceCode } from "./selectReplaceCode";

export const selectFocusedInvestigators = (state: RootState) => {
	const selected = selectSelectedInvestigators(state);
	const replaceCode = selectReplaceCode(state);
	if (!replaceCode) {
		return selected;
	}
	return selected;
};
