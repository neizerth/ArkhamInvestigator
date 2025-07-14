import type { RootState } from "@shared/model";
import { selectOrderedChaosBagContents } from "./selectOrderedChaosBagContents";

export const selectAvailableChaosTokens = (state: RootState) =>
	selectOrderedChaosBagContents(state).filter(({ sealed }) => !sealed);
