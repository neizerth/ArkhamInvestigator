import type { RootState } from "@shared/model";
import { selectChaosBagContents } from "../chaosBag";

export const selectChaosTokenCount = (state: RootState) => {
	const contents = selectChaosBagContents(state);
	return contents.length;
};
