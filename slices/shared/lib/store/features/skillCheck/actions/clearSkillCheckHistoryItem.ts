import type { AppThunk } from "@shared/model";
import { reject } from "ramda";

import { whereId } from "../../../../util";
import { selectCurrentBoard, setBoardProp } from "../../board";
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

		const checkHistory = reject(whereId(id), board.checkHistory);

		dispatch(setBoardProp("checkHistory", checkHistory));
	};
