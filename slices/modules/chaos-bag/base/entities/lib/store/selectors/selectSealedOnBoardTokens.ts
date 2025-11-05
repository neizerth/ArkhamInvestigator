import { selectBoardId } from "@modules/board/base/shared/lib";
import type { BoardId } from "@modules/board/base/shared/model";
import { selectChaosBagContents } from "@modules/chaos-bag/base/shared/lib";
import { createSelector } from "@reduxjs/toolkit";

export const selectSealedOnBoardTokens = (boardId: BoardId) =>
	createSelector(
		[selectChaosBagContents, selectBoardId(boardId)],
		(contents, boardId) =>
			contents.filter(
				({ sealData }) =>
					sealData?.type === "investigator" && sealData.boardId === boardId,
			),
	);
