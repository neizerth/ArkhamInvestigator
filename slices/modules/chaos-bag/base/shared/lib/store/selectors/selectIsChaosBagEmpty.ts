import type { RootState } from "@shared/model";
import { selectChaosBagContents } from "../chaosBag";

export const selectIsChaosBagEmpty = (state: RootState) => {
	const contents = selectChaosBagContents(state);
	return contents.length === 0;
};
