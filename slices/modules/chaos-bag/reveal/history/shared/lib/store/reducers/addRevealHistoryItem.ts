import type { ChaosBagHistoryItem } from "../../../../../../base/shared/model";
import type { ChaosBagRevealHistoryReducer } from "../../../model";
import { handleAddRevealHistoryItem } from "../handlers";

export const addRevealHistoryItem: ChaosBagRevealHistoryReducer<
	ChaosBagHistoryItem
> = (state, { payload }) => {
	handleAddRevealHistoryItem(state, payload);
};
