import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardChaosTokenOptionsById } from "./options/selectBoardChaosTokenOptionsById";

export const selectChaosTokensRevealCount = (boardId: BoardId) =>
	createSelector([selectBoardChaosTokenOptionsById(boardId)], (data) => {});
