import { isNumericChaosTokenType } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { isNumericTokenModified } from "./isNumericTokenModified";

type Options = {
	value?: number;
	defaultValue?: number;
	type: ChaosTokenType;
};

export const isChaosTokenModified = (options: Options) => {
	const { type, value, defaultValue } = options;

	if (typeof value !== "number") {
		return false;
	}

	if (isNumericChaosTokenType(type)) {
		return isNumericTokenModified({
			value,
			type,
		});
	}

	if (typeof defaultValue !== "number") {
		return false;
	}

	return value !== defaultValue;
};
