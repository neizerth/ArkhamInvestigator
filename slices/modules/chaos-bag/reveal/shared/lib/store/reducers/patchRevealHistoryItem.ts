import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandlePatchRevealHistoryItemPayload,
	handlePatchRevealHistoryItem,
} from "../handlers";

export const patchRevealHistoryItem: ChaosBagReducer<
	HandlePatchRevealHistoryItemPayload
> = (state, { payload }) => {
	handlePatchRevealHistoryItem(state, payload);
};
