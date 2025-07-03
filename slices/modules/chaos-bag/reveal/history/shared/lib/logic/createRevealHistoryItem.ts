import type {
	ChaosBagHistoryItem,
	ChaosBagHistoryItemData,
} from "@modules/chaos-bag/base/shared/model";
import { v4 } from "uuid";

export const createRevealHistoryItem = (
	data: ChaosBagHistoryItemData,
): ChaosBagHistoryItem => ({
	id: v4(),
	...data,
});
