import type { BoardId } from "@modules/board/base/shared/model";
import type {
	ChaosTokenType,
	ChaosTokenValues,
} from "@modules/chaos-bag/base/shared/model";

import { baseSymbolicChaosTokenTypes } from "@modules/chaos-bag/base/shared/config/token/types";
import { defaultChaosTokenValue } from "@modules/chaos-bag/value/shared/config";
import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import type { ReferenceCardToken } from "arkham-investigator-data";
import { range } from "ramda";
import { isUndefined } from "ramda-adjunct";
import { getSelectRange, getValueRange } from "./range";
import { getCounterRange } from "./range/getCounterRange";

const MAX_VALUE = defaultChaosTokenValue.max;
const MIN_VALUE = defaultChaosTokenValue.min;

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

		if (value && specialValues.includes(value)) {
			return [value];
		}

		return defaultData;
	}

	if (item.type === "value") {
		return getValueRange(item);
	}

	if (item.type === "counter") {
		return getCounterRange(item);
	}

	if (item.type === "select" && item.values) {
		return getSelectRange(item);
	}

	if (value && specialValues.includes(value)) {
		return [value];
	}

	return defaultData;
};
