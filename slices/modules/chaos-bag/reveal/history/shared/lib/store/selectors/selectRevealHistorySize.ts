import type { RootState } from "@shared/model";
import { selectRevealHistory } from "../chaosBagRevealHistory";

export const selectRevealHistorySize = (state: RootState) =>
	selectRevealHistory(state).length;
