import type { BoardId } from "@modules/board/base/shared/model";

import { selectChaosTokenValueInternal } from "@modules/chaos-bag/base/shared/lib";
import {
	selectBoardRefenceCardTokenValues,
	selectCurrentReferenceCardTokenValues,
} from "@modules/chaos-bag/value/entities/lib";
import {
	selectBoardElderSignValue,
	selectBoardSpecialTokenValues,
} from "@modules/mechanics/chaos-bag/value/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardTokenValues } from "./selectBoardTokenValues";

export const selectChaosBagTokenValues = (boardId?: BoardId) =>
	createSelector(
		[
			selectCurrentReferenceCardTokenValues,
			selectBoardRefenceCardTokenValues(boardId),
			selectBoardElderSignValue(boardId),
			selectChaosTokenValueInternal,
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
