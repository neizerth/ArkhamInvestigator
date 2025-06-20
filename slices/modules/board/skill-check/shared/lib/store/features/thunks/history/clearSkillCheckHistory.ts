import type { AppThunk } from "@shared/model";
import { propEq, reject } from "ramda";

import { selectBoardById, setBoardProp } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectSkillCheckType, sendCommandSignal } from "../../skillCheck";

export const clearSkillCheckHistory =
	(boardId: BoardId): AppThunk =>
	(dispatch, getState) => {
		const state = getState();
		const board = selectBoardById(boardId)(state);
		const type = selectSkillCheckType(state);

		if (!board || !type) {
			return;
		}

		const checkHistory = reject(propEq(type, "type"), board.checkHistory);

		dispatch(
			setBoardProp({
				boardId,
				prop: "checkHistory",
				value: checkHistory,
			}),
		);

		dispatch(sendCommandSignal("clear"));
	};
