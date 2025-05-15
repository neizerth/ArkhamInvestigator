import { whereId } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { reject } from "ramda";
import { selectRevealHistory, setRevealHistory } from "../../chaosBag";

export const removeRevealHistoryItem =
	(id: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const history = selectRevealHistory(state);

		const data = reject(whereId(id), history);
		dispatch(setRevealHistory(data));
	};
