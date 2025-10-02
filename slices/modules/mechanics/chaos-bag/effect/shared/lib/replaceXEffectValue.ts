import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { replaceCharacter } from "../config";
import { getEffectTokenValue } from "./getEffectTokenValue";

type Options = {
	text: string;
	value: ChaosTokenValue;
};

export const replaceXEffectValue = ({ text, value }: Options) => {
	const effectValue = getEffectTokenValue(value);
	return text.replace(/([-—−]X)/, `${effectValue} ${replaceCharacter} $1`);
};
