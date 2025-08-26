import type { BoardId } from "@modules/board/base/shared/model";

import { selectModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenValues } from "@modules/chaos-bag/base/shared/model";
import {
	defaultChaosTokenValues,
	defaultNumericChaosTokenValue,
} from "@modules/chaos-bag/value/shared/config";
import { selectChaosTokenValueInternal } from "@modules/chaos-bag/value/shared/lib";
import { selectBoardChaosTokenValueModifications } from "@modules/mechanics/chaos-bag/value/entities/lib";
import { createSelector } from "@reduxjs/toolkit";
import { selectBoardRefenceCardTokenValues } from "./selectBoardRefenceCardTokenValues";
import { selectBoardTokenValues } from "./selectBoardTokenValues";
import { selectCurrentReferenceCardTokenValues } from "./selectCurrentReferenceCardTokenValues";

export const selectChaosBagTokenValues = (boardId: BoardId) =>
	createSelector(
		[
			selectCurrentReferenceCardTokenValues,
			selectBoardRefenceCardTokenValues(boardId),
			selectChaosTokenValueInternal,
			selectBoardTokenValues(boardId),
			selectBoardChaosTokenValueModifications(boardId),
			selectModifyChaosTokens,
		],
		(
			referenceCardValues,
			defaultInvestigatorValues,
			values,
			customizedValues,
			signatureModifications,
			modify,
		): ChaosTokenValues => {
			if (!modify) {
				return {};
			}
			const tokenValues = {
				...defaultNumericChaosTokenValue,
				...defaultChaosTokenValues,
				...referenceCardValues,
				...defaultInvestigatorValues,
				...(values || {}),
				...(customizedValues || {}),
				...signatureModifications,
			};

			return tokenValues;
		},
	);
