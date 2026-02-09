import { defaultChaosTokenValue } from "@modules/chaos-bag/value/shared/config";
import type { ReferenceCardTokenCounter } from "arkham-investigator-data";
import { rangeStep } from "ramda-adjunct";

const MAX_VALUE = defaultChaosTokenValue.max;
const MIN_VALUE = defaultChaosTokenValue.min;

export const getCounterRange = (options: ReferenceCardTokenCounter) => {
	const { max = MAX_VALUE, step } = options;

	const min = options.min ?? Math.ceil(MIN_VALUE / step) * step;

	// rangeStep(step, from, to): to is exclusive. For step > 0 we need end past last value → max + step; for step < 0 → max + step
	const end = max + step;
	return rangeStep(step, min, end);
};
