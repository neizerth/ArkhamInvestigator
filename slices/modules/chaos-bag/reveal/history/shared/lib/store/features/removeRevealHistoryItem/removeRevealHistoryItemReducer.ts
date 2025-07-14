import type { ChaosBagRevealHistoryReducer } from "../../../../model";
import {
	type HandleRemoveRevealHistoryItemPayload,
	handleRemoveRevealHistoryItem,
} from "./handleRemoveRevealHistoryItem";

export const removeRevealHistoryItemReducer: ChaosBagRevealHistoryReducer<
	HandleRemoveRevealHistoryItemPayload
> = (state, { payload }) => {
	handleRemoveRevealHistoryItem(state, payload);
};
