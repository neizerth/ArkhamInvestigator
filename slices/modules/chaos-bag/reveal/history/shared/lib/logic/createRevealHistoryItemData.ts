import type { ChaosBagHistoryItemData } from "../../../../../base/shared/model";

type CreateRevealHistoryItemDataOptions = Omit<
	ChaosBagHistoryItemData,
	"id" | "date"
>;

export const createRevealHistoryItemData = (
	options: CreateRevealHistoryItemDataOptions,
): ChaosBagHistoryItemData => {
	return {
		...options,
		date: Date(),
	};
};
