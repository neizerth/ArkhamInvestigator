import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { getEffectTokenValue } from "./getEffectTokenValue";

type Options = {
	text: string;
	value: ChaosTokenValue;
};

export const replaceXEffectValue = ({ text, value }: Options) => {
	const effectValue = getEffectTokenValue(value);
	return text.replace(/([-—−]X)/, `${effectValue} ($1)`);
};
