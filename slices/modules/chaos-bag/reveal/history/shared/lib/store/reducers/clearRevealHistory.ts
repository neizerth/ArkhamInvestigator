import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import { handleClearRevealHistory } from "../handlers";

export const clearRevealHistory: ChaosBagReducer = (state) => {
	handleClearRevealHistory(state);
};
