import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { getEffectTokenValue } from "./getEffectTokenValue";

type Options = {
	text: string;
	value: ChaosTokenValue;
};

export const replaceNumericEffectValue = ({ text, value }: Options) => {
	const effectValue = getEffectTokenValue(value);
	return text.replace(/([-—−]?\d+)/, (source) => {
		const sourceValue = +source.replace(/[-—−]/, "-");
		if (!Number.isNaN(sourceValue) && sourceValue === effectValue) {
			return source;
		}
		return `${effectValue} (${source})`;
	});
};
