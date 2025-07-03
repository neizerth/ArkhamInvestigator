import type {
	ChaosBagHistoryItem,
	ChaosBagHistoryItemData,
} from "@modules/chaos-bag/base/shared/model";

export const updateRevealHistoryItem = (
	item: ChaosBagHistoryItem,
	update: ChaosBagHistoryItemData,
) => ({
	...item,
	...update,
});
