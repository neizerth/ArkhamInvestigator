import type { BoardId } from "@modules/board/base/shared/model";
import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";

import { baseSymbolicChaosTokenTypes } from "@modules/chaos-bag/base/shared/config/token/types";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { rangeStep } from "@shared/lib";
import type { ReferenceCardToken } from "arkham-investigator-data";
import { range } from "ramda";
import { isUndefined } from "ramda-adjunct";
import { getSelectRange, getValueRange } from "./range";
const MAX_VALUE = 10;
const MIN_VALUE = -9;

const defaultData = range(MIN_VALUE, MAX_VALUE + 1);

const scenarioData = range(MIN_VALUE, 1);

type Options = {
	type: ChaosTokenType;
	boardId: BoardId;
	specialTokens: ChaosTokenValues;
	value?: ChaosTokenValue;
	item?: ReferenceCardToken;
};

const specialValues: ChaosTokenValue[] = ["fail", "success"];

export const getChaosTokenRangeByType = ({
	type,
	specialTokens,
	item,
	value,
}: Options): ChaosTokenValue[] => {
	const specialValue = specialTokens[type];

	if (type === "autoFail" && isUndefined(specialValue)) {
		return [];
	}

	if (specialValue === "fail") {
		return ["fail"];
	}

	if (typeof specialValue !== "undefined") {
		return [specialValue];
	}

	if (!item) {
		if (baseSymbolicChaosTokenTypes.includes(type)) {
			return scenarioData;
		}

		return value && specialValues.includes(value) ? [value] : defaultData;
	}

	if (item.type === "value") {
		return getValueRange(item);
	}

	if (item.type === "counter") {
		const { max = MAX_VALUE, step } = item;

		const min = item.min ?? Math.ceil(MIN_VALUE / step) * step;

		return rangeStep(min, max + 1, step);
	}

	if (item.type === "select" && item.values) {
		return getSelectRange(item);
	}

	if (value && specialValues.includes(value)) {
		return [value];
	}

	return defaultData;
};
