import type { AppThunk } from "@shared/model";
import {
	selectRevealHistory,
	selectRevealHistoryItem,
	setRevealHistory,
	setRevealHistoryItem,
} from "../../chaosBag";

export const addRevealHistoryItem = (): AppThunk => (dispatch, getState) => {
	const state = getState();

	const items = selectRevealHistory(state);

	const item = selectRevealHistoryItem(state);

	if (!item) {
		return;
	}

	if (item.tokens.length > 0) {
		dispatch(setRevealHistory([...items, item]));
	}

	dispatch(setRevealHistoryItem(null));
};
