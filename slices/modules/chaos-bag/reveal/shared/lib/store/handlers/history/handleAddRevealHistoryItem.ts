import type {
	ChaosBagHandler,
	ChaosBagHistoryItem,
} from "@modules/chaos-bag/base/shared/model";

export const handleAddRevealHistoryItem: ChaosBagHandler<
	ChaosBagHistoryItem
> = (state, payload) => {
	state.revealHistory.push(payload);
};
