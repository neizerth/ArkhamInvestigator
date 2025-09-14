import type { BoardId } from "@modules/board/base/shared/model";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { selectBoardChaosTokenValueModifications } from "@modules/mechanics/chaos-bag/value/entities/lib";

import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { selectReferenceCardTokens } from "@modules/stories/shared/lib";
import { createSelector } from "@reduxjs/toolkit";
import { rangeStep } from "@shared/lib";
import { propEq, range } from "ramda";
import { isUndefined } from "ramda-adjunct";
import { getSelectRange, getValueRange } from "../../logic";

const MAX_VALUE = 10;
const MIN_VALUE = -9;

const defaultData = range(MIN_VALUE, MAX_VALUE + 1);

type Options = {
	type: ChaosTokenType;
	boardId: BoardId;
	value?: ChaosTokenValue;
};

const specialValues: ChaosTokenValue[] = ["fail", "success"];

export const selectChaosTokenRangeByType = ({
	type,
	boardId,
	value,
}: Options) =>
	createSelector(
		[
			selectReferenceCardTokens,
			selectBoardChaosTokenValueModifications(boardId),
		],
		(data, specialTokens) => {
			const specialValue = specialTokens[type];
			const item = data.find(propEq(type, "token"));

			if (
				type === "autoFail" &&
				(isUndefined(specialValue) || specialValue === "fail")
			) {
				return [];
			}

			if (typeof specialValue !== "undefined") {
				return [specialValue];
			}

			if (!item) {
				return value && specialValues.includes(value) ? [value] : defaultData;
			}

			if (item.type === "value") {
				return getValueRange(item);
			}

			if (item.type === "counter") {
				const { min = MIN_VALUE, max = MAX_VALUE, step } = item;

				return rangeStep(min, max + 1, step);
			}

			if (item.type === "select" && item.values) {
				return getSelectRange(item);
			}

			if (value && specialValues.includes(value)) {
				return [value];
			}

			return defaultData;
		},
	);
