import { selectCurrentBoardProp } from "@shared/lib";
import type { AppThunk } from "@shared/model";
import { v4 } from "uuid";
import type { ChaosBagToken } from "../../../../../../model";
import {
	selectChaosBagSkillCheckExpression,
	selectChaosBagSkillCheckTitle,
	selectChaosBagSkillCheckType,
	selectChaosBagSkillValue,
	selectRevealHistoryItem,
	setRevealHistoryItem,
} from "../../chaosBag";

export const updateCurrentRevealHistoryItem =
	(revealedTokens: ChaosBagToken[]): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const currentHistoryItem = selectRevealHistoryItem(state);
		const boardId = selectCurrentBoardProp("id")(state);
		const skillCheckType = selectChaosBagSkillCheckType(state);
		const skillCheckValue = selectChaosBagSkillValue(state);
		const skillCheckExpression = selectChaosBagSkillCheckExpression(state);
		const title = selectChaosBagSkillCheckTitle(state);

		if (!boardId) {
			return;
		}

		const historyItem = currentHistoryItem || {
			id: v4(),
			date: Date(),
			boardId,
			skillCheckType,
			skillCheckValue,
			skillCheckExpression,
			tokens: [],
			title,
		};

		const tokens = [...historyItem.tokens, ...revealedTokens];

		dispatch(
			setRevealHistoryItem({
				...historyItem,
				tokens,
			}),
		);
	};
