import type { ChaosBagReducer } from "@modules/chaos-bag/base/shared/model";
import {
	type HandleRemoveRevealHistoryItemPayload,
	handleRemoveRevealHistoryItem,
} from "../../handlers";

export const removeRevealHistoryItem: ChaosBagReducer<
	HandleRemoveRevealHistoryItemPayload
> = (state, { payload }) => {
	handleRemoveRevealHistoryItem(state, payload);
};
