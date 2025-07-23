import type { BoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import {
	selectBoardChaosTokenValueModifications,
	selectBoardElderSignValue,
} from "@modules/mechanics/chaos-bag/value/entities/lib";

import { createSelector } from "@reduxjs/toolkit";
import { rangeStep, selectReferenceCardTokens } from "@shared/lib";
import { propEq, range } from "ramda";

const MAX_VALUE = 20;
const MIN_VALUE = -21;

const defaultData = range(MIN_VALUE, MAX_VALUE + 1);

type Options = {
	type: ChaosTokenType;
	boardId: BoardId;
};

export const selectChaosTokenRangeByType = ({ type, boardId }: Options) =>
	createSelector(
		[
			selectReferenceCardTokens,
			selectBoardElderSignValue(boardId),
			selectBoardChaosTokenValueModifications(boardId),
		],
		(data, elderSignValue, specialTokens) => {
			const specialValue = specialTokens[type];

			if (typeof specialValue === "number") {
				return [specialValue];
			}
			if (type === "elderSign" && elderSignValue) {
				return [elderSignValue];
			}
			const item = data.find(propEq(type, "token"));

			if (!item || item.type === "value") {
				return defaultData;
			}

			if (item.type === "counter") {
				const { min = MIN_VALUE, max = MAX_VALUE, step } = item;

				return rangeStep(min, max + 1, step);
			}

			if (item.type === "select" && item.values) {
				return item.values;
			}

			return defaultData;
		},
	);
