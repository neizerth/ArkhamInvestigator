import type { ChaosBagHistoryItem } from "@modules/chaos-bag/base/shared/model";
import type { ChaosBagRevealHistoryHandler } from "../../../../model";

export const handleAddRevealHistoryItem: ChaosBagRevealHistoryHandler<
	ChaosBagHistoryItem
> = (state, payload) => {
	state.revealHistory.push(payload);
};
