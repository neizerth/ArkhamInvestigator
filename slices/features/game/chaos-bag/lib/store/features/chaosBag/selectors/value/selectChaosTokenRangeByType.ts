import { createSelector } from "@reduxjs/toolkit";
import { rangeStep, selectReferenceCardTokens } from "@shared/lib";
import { propEq, range } from "ramda";
import type { ChaosTokenType } from "../../../../../../model";
import { getInvestigatorSpecialTokenValues } from "../../../../../tokens";
import { selectInvestigatorElderSignValue } from "../reference";

const MAX_VALUE = 20;
const MIN_VALUE = -21;

const defaultData = range(MIN_VALUE, MAX_VALUE + 1);

type Options = {
	type: ChaosTokenType;
	code: string;
};

export const selectChaosTokenRangeByType = ({ type, code }: Options) =>
	createSelector(
		[selectReferenceCardTokens, selectInvestigatorElderSignValue(code)],
		(data, elderSignValue) => {
			const specialTokens = getInvestigatorSpecialTokenValues(code);
			const specialValue = specialTokens[type];

			if (typeof specialValue === "number") {
				return [specialValue];
			}
			if (type === "elderSign" && elderSignValue) {
				return [elderSignValue.elderSign];
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
