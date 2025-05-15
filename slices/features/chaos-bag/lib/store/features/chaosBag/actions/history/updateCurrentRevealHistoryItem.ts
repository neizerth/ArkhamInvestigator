import { selectCurrentBoardProp } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { v4 } from "uuid";
import type { ChaosBagToken } from "../../../../../../model";
import {
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
	selectRevealHistoryItem,
	setRevealHistoryItem,
} from "../../chaosBag";

export const updateCurrentRevealHistoryItem =
	(tokens: ChaosBagToken[]): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentHistoryItem = selectRevealHistoryItem(state);
		const boardId = selectCurrentBoardProp("id")(state);
		const skillCheckType = selectChaosBagSkillCheckType(state);
		const skillCheckValue = selectChaosBagSkillValue(state);

		if (!boardId) {
			return;
		}

		const historyItem = currentHistoryItem || {
			id: v4(),
			date: Date(),
			boardId,
			skillCheckType,
			skillCheckValue,
			tokens: [],
		};

		historyItem.tokens = [...historyItem.tokens, ...tokens];

		dispatch(setRevealHistoryItem(historyItem));
	};
