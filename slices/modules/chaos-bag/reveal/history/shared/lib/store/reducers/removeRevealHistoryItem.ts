import type { ChaosBagRevealHistoryReducer } from "../../../model";
import {
	type HandleRemoveRevealHistoryItemPayload,
	handleRemoveRevealHistoryItem,
} from "../handlers";

export const removeRevealHistoryItem: ChaosBagRevealHistoryReducer<
	HandleRemoveRevealHistoryItemPayload
> = (state, { payload }) => {
	handleRemoveRevealHistoryItem(state, payload);
};
