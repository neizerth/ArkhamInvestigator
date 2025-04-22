import type { AppThunk } from "@shared/model";
import { propEq, reject } from "ramda";

import { selectCurrentBoard, setCurrentBoardProp } from "../../board";
import { selectSkillCheckType } from "../skillCheck";

export const clearSkillCheckHistoryItem =
	(id: string): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectCurrentBoard(state);
		const type = selectSkillCheckType(state);

		if (!type) {
			return;
		}

		const checkHistory = reject(propEq(id, "id"), board.checkHistory);

		dispatch(setCurrentBoardProp("checkHistory", checkHistory));
	};
