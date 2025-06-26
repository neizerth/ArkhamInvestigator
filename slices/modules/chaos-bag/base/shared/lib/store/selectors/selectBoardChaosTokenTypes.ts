import { createSelector } from "@reduxjs/toolkit";
import { selectBoardById } from "@shared/lib";
import type { BoardId } from "@shared/model";
import { getChaosBagTokenReference } from "../../features";

export const selectBoardChaosTokenTypes = (boardId: BoardId) =>
	createSelector([selectBoardById(boardId)], (board) => {
		const { text } = board.investigator;
		const reference = getChaosBagTokenReference([text]);

		const types = reference.flatMap((item) => {
			if (item.type === "single") {
				return item.token;
			}
			return item.tokens;
		});

		return types;
	});
