import type { ChaosBagRevealHistoryReducer } from "../../../../model";
import {
	type HandlePatchRevealHistoryItemPayload,
	handlePatchRevealHistoryItem,
} from "./handlePatchRevealHistoryItem";

export const patchRevealHistoryItemReducer: ChaosBagRevealHistoryReducer<
	HandlePatchRevealHistoryItemPayload
> = (state, { payload }) => {
	handlePatchRevealHistoryItem(state, payload);
};
