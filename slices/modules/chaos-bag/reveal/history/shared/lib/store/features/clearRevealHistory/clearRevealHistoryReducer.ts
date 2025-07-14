import type { ChaosBagRevealHistoryReducer } from "../../../../model";
import { handleClearRevealHistory } from "./handleClearRevealHistory";

export const clearRevealHistoryReducer: ChaosBagRevealHistoryReducer = (
	state,
) => {
	handleClearRevealHistory(state);
};
