import type { BoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { selectBoardChaosTokenValueModifications } from "@modules/mechanics/chaos-bag/value/entities/lib";
import { selectReferenceCardTokenByType } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { getChaosTokenRangeByType } from "../../logic";

const MAX_VALUE = 10;
const MIN_VALUE = -9;

type Options = {
	type: ChaosTokenType;
	boardId: BoardId;
	value?: ChaosTokenValue;
};

export const selectChaosTokenRangeByType = ({
	type,
	boardId,
	value,
}: Options) =>
	createSelector(
		[
			selectReferenceCardTokenByType(type),
			selectBoardChaosTokenValueModifications(boardId),
		],
		(item, specialTokens) => {
			return getChaosTokenRangeByType({
				type,
				boardId,
				specialTokens,
				item,
				value,
			});
		},
	);
