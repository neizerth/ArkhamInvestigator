import type { ChaosBagRevealHistoryReducer } from "../../../model";
import { handleClearRevealHistory } from "../handlers";

export const clearRevealHistory: ChaosBagRevealHistoryReducer = (state) => {
	handleClearRevealHistory(state);
};
