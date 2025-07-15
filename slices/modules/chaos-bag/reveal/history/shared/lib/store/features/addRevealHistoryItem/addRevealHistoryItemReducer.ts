import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagRevealHistoryReducer } from "../../../../model";
import { handleAddRevealHistoryItem } from "./handleAddRevealHistoryItem";

export const addRevealHistoryItemReducer: ChaosBagRevealHistoryReducer<
	ChaosBagHistoryItem
> = (state, { payload }) => {
	handleAddRevealHistoryItem(state, payload);
};
