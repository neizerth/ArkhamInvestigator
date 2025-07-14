import type { ChaosBagHistoryItem } from "@features/game/chaos-bag/model";
import type { ChaosBagRevealHistoryReducer } from "../../../../model";
import { handleAddRevealHistoryItem } from "./handleAddRevealHistoryItem";

export const addRevealHistoryItemReducer: ChaosBagRevealHistoryReducer<
	ChaosBagHistoryItem
> = (state, { payload }) => {
	handleAddRevealHistoryItem(state, payload);
};
