import { selectBoardById } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getBoardHorror } from "../../../logic";

export const selectBoardHorror = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], getBoardHorror);
