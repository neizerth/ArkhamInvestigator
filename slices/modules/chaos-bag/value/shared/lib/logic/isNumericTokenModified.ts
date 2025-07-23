import type { NumericChaosTokenType } from "@modules/chaos-bag/base/shared/model";
import { defaultNumericChaosTokenValue } from "../../config";

type Options = {
	value: number;
	type: NumericChaosTokenType;
};
export const isNumericTokenModified = ({ type, value }: Options) => {
	const defaultValue = defaultNumericChaosTokenValue[type];

	return defaultValue !== value;
};
