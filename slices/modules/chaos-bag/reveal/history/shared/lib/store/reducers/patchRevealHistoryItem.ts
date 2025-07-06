import type { ChaosBagRevealHistoryReducer } from "../../../model";
import {
	type HandlePatchRevealHistoryItemPayload,
	handlePatchRevealHistoryItem,
} from "../handlers";

export const patchRevealHistoryItem: ChaosBagRevealHistoryReducer<
	HandlePatchRevealHistoryItemPayload
> = (state, { payload }) => {
	handlePatchRevealHistoryItem(state, payload);
};
