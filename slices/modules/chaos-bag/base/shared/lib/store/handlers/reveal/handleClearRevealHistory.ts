import type { ChaosBagHandler } from "@modules/chaos-bag/base/shared/model";

export const handleClearRevealHistory: ChaosBagHandler = (store) => {
	store.revealHistory = [];
};
