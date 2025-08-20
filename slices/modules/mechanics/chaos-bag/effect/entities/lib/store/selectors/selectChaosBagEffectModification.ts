import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { chaosBagEffectModifications } from "../../../config";

const defaultModification = () => "";

export const selectChaosBagEffectModification = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		const { code } = board.investigator;

		const modification = chaosBagEffectModifications[code];

		if (!modification) {
			return defaultModification;
		}

		return modification;
	});
