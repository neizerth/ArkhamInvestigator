import { haveXEffect } from "./haveXEffect";
import { replaceNumericEffectValue } from "./replaceNumericEffectValue";
import { replaceXEffectValue } from "./replaceXEffectValue";

type Options = {
	text: string;
	value: number;
};

export const replaceTokenEffectValue = (options: Options) => {
	const { text } = options;
	if (haveXEffect(text)) {
		return replaceXEffectValue(options);
	}
	return replaceNumericEffectValue(options);
};
