import type { BoardId } from "@modules/board/base/shared/model";

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
import { selectBoardRefenceCardTokenValues } from "./selectBoardRefenceCardTokenValues";
import { selectBoardTokenValues } from "./selectBoardTokenValues";
import { selectCurrentReferenceCardTokenValues } from "./selectCurrentReferenceCardTokenValues";

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
			referenceCardValues,
			defaultInvestigatorValues,
			elderSign,
			values,
			customizedValues,
			signatureModifications,
		) => {
			return {
				...defaultNumericChaosTokenValue,
				...defaultChaosTokenValues,
				...referenceCardValues,
				...defaultInvestigatorValues,
				...(elderSign ? { elderSign } : {}),
				...(values || {}),
				...(customizedValues || {}),
				...signatureModifications,
			};
		},
	);
