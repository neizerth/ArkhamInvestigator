import type { ChaosBagRevealHistoryHandler } from "../../../../model";

export const handleClearRevealHistory: ChaosBagRevealHistoryHandler = (
	store,
) => {
	store.revealHistory = [];
};
