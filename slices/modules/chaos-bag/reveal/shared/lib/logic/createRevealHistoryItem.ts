import { v4 } from "uuid";
import type { ChaosBagHistoryItem } from "../../../../base/shared/model";

type CreateRevealHistoryItemOptions = Omit<
	ChaosBagHistoryItem,
	"id" | "date" | "tokens"
>;

export const createRevealHistoryItem = (
	options: CreateRevealHistoryItemOptions,
): ChaosBagHistoryItem => {
	return {
		...options,
		id: v4(),
		date: Date(),
		tokens: [],
	};
};
