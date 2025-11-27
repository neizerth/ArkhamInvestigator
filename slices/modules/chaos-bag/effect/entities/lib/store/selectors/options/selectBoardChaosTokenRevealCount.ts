import type { BoardId } from "@modules/board/base/shared/model";
import { createSelector } from "@reduxjs/toolkit";
import { getBoardChaosBagRevealCount } from "../../../logic/options/getBoardChaosBagRevealCount";
import { selectBoardChaosTokenOptionsById } from "./selectBoardChaosTokenOptionsById";

export const selectBoardChaosBagRevealCount = (boardId: BoardId) =>
	createSelector(
		[selectBoardChaosTokenOptionsById(boardId)],
		(tokenOptionMap) => getBoardChaosBagRevealCount(tokenOptionMap),
	);
