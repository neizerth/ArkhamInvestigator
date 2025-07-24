import { replaceNumericEffectValue } from "./replaceNumericEffectValue";
import { replaceXEffectValue } from "./replaceXEffectValue";

type Options = {
	text: string;
	value: number;
};

export const replaceEffectValue = (options: Options) => {
	const { value } = options;
	const text = replaceXEffectValue(options);

	return replaceNumericEffectValue({
		text,
		value,
	});
};
