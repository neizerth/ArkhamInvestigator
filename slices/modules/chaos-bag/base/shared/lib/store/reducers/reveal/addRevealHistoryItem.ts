import type { ChaosBagHistoryItem, ChaosBagReducer } from "../../../../model";
import { handleAddRevealHistoryItem } from "../../handlers";

export const addRevealHistoryItem: ChaosBagReducer<ChaosBagHistoryItem> = (
	state,
	{ payload },
) => {
	handleAddRevealHistoryItem(state, payload);
};
