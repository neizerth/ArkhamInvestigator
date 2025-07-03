import type { ChaosBagHistoryItemData } from "../../../../base/shared/model";

type CreateRevealHistoryItemDataOptions = Omit<
	ChaosBagHistoryItemData,
	"id" | "date" | "tokens"
>;

export const createRevealHistoryItemData = (
	options: CreateRevealHistoryItemDataOptions,
): ChaosBagHistoryItemData => {
	return {
		...options,
		date: Date(),
		tokens: [],
	};
};
