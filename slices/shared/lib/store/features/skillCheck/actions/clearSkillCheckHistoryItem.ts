import type { AppThunk } from "@shared/model";
import { propEq, reject } from "ramda";

import type { SkillCheckHistoryItem } from "@shared/model";
import { selectCurrentBoard, setCurrentBoard } from "../../board";
import { selectSkillCheckType } from "../skillCheck";

export const clearSkillCheckHistoryItem =
	(item: SkillCheckHistoryItem): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		const type = selectSkillCheckType(state);

		if (!board || !type) {
			return;
		}

		const checkHistory = reject(propEq(item.id, "id"), board.checkHistory);

		dispatch(
			setCurrentBoard({
				...board,
				checkHistory,
			}),
		);
	};
