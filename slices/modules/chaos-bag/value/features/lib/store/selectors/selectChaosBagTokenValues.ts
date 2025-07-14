import type { BoardId } from "@modules/board/base/shared/model";

import {
	selectBoardRefenceCardTokenValues,
	selectCurrentReferenceCardTokenValues,
} from "@modules/chaos-bag/value/entities/lib";
import {
	defaultChaosTokenValues,
	defaultNumericChaosTokenValue,
} from "@modules/chaos-bag/value/shared/config";
import { selectChaosTokenValueInternal } from "@modules/chaos-bag/value/shared/lib";
import {
	selectBoardChaosTokenValueModifications,
	selectBoardElderSignValue,
} from "@modules/mechanics/chaos-bag/value/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardTokenValues } from "./selectBoardTokenValues";

export const selectChaosBagTokenValues = (boardId: BoardId) =>
	createSelector(
		[
			selectCurrentReferenceCardTokenValues,
			selectBoardRefenceCardTokenValues(boardId),
			selectBoardElderSignValue(boardId),
			selectChaosTokenValueInternal,
			selectBoardTokenValues(boardId),
			selectBoardChaosTokenValueModifications(boardId),
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
				...defaultNumericChaosTokenValue,
				...defaultChaosTokenValues,
				...defaultValues,
				...defaultInvestigatorValues,
				...(elderSign ? { elderSign } : {}),
				...(values || {}),
				...(investigatorValues || {}),
				...specialValues,
			};
		},
	);
