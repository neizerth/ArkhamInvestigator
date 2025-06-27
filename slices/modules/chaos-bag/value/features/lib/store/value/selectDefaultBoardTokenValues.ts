import type { BoardId } from "@modules/board/base/shared/model";

import {
	selectBoardRefenceCardTokenValues,
	selectCurrentReferenceCardTokenValues,
} from "@modules/chaos-bag/value/entities/lib";
import {
	selectBoardElderSignValue,
	selectBoardSpecialTokenValues,
} from "@modules/mechanics/chaos-bag/value/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectChaosTokenValue } from "../../../../../base/shared/lib/store/chaosBag";
import { selectBoardTokenValues } from "./selectBoardTokenValues";

export const selectDefaultBoardTokenValues = (boardId: BoardId) =>
	createSelector(
		[
			selectCurrentReferenceCardTokenValues,
			selectBoardRefenceCardTokenValues(boardId),
			selectBoardElderSignValue(boardId),
			selectChaosTokenValue,
			selectBoardTokenValues(boardId),
			selectBoardSpecialTokenValues(boardId),
		],
		(
			defaultValues,
			defaultInvestigatorValues,
			elderSign,
			values,
			investigatorValues,
			specialValues,
		) => {
			return {
				...defaultValues,
				...defaultInvestigatorValues,
				...(elderSign ? { elderSign } : {}),
				...(values || {}),
				...(investigatorValues || {}),
				...specialValues,
			};
		},
	);
