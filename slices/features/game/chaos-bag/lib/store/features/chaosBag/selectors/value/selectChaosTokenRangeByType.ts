import { createSelector } from "@reduxjs/toolkit";
import { selectReferenceCardTokenValues } from "@shared/lib";
import { propEq, range } from "ramda";
import type { ChaosTokenType } from "../../../../../../model";

const MAX_VALUE = 20;
const MIN_VALUE = -21;

const defaultData = range(MIN_VALUE, MAX_VALUE + 1);

export const selectChaosTokenRangeByType = (type: ChaosTokenType) =>
	createSelector([selectReferenceCardTokenValues], (data) => {
		const item = data.find(propEq(type, "token"));

		if (!item || item.type === "value") {
			return defaultData;
		}

		if (item.type === "counter") {
			const { min = MIN_VALUE, max = MAX_VALUE } = item;

			return range(min, max + 1);
		}

		if (item.type === "select" && item.values) {
			return item.values;
		}

		return defaultData;
	});
