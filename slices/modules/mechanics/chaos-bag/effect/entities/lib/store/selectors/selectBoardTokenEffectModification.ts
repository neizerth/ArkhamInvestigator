import { isBoardExists, selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { tokenEffectModifications } from "../../../config";
import { getDefultEffectModificationCallback } from "../../logic";

export const selectBoardTokenEffectModification = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		if (!isBoardExists(board)) {
			return getDefultEffectModificationCallback;
		}

		const { code } = board.investigator;

		const modification = tokenEffectModifications[code];

		if (!modification) {
			return getDefultEffectModificationCallback;
		}

		return modification;
	});
