import type { BoardId } from "@modules/board/base/shared/model";
import { selectReferenceCardTokens } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { mapChaosTokenOptions } from "../../../logic";
import { selectBoardChaosTokenOptionIndexesById } from "./selectBoardChaosTokenOptionIndexesById";

export const selectBoardChaosTokenOptionsById = (boardId: BoardId) =>
	createSelector(
		[
			selectBoardChaosTokenOptionIndexesById(boardId),
			selectReferenceCardTokens,
		],
		(optionIndexMap, tokens) => {
			return mapChaosTokenOptions({
				optionIndexMap,
				tokens,
			});
		},
	);
