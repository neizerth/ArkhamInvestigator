import type { AppThunk } from "@shared/model";
import { v4 } from "uuid";
import type { ChaosBagHistoryItem } from "../../../../../../model";
import { selectRevealHistory, setRevealHistory } from "../../chaosBag";

type Options = Omit<ChaosBagHistoryItem, "id">;

export const addRevealHistoryItem =
	(options: Options): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const id = v4();

		const items = selectRevealHistory(state);

		const item = {
			id,
			...options,
		};

		dispatch(setRevealHistory([...items, item]));
	};
