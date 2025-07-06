import { chaosBag } from "@modules/chaos-bag/base/shared/lib";

export const {
	clearRevealHistory,
	addRevealHistoryItem,
	removeRevealHistoryItem,
	patchRevealHistoryItem,
} = chaosBag.actions;
