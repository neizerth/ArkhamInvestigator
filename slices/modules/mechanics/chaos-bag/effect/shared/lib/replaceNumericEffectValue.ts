import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { getEffectTokenValue } from "./getEffectTokenValue";

type Options = {
	text: string;
	value: ChaosTokenValue;
};

const MAX_INDEX = 20;

export const replaceNumericEffectValue = ({ text, value }: Options) => {
	const effectValue = getEffectTokenValue(value);
	return text.replace(/([-—−+]?\d+)/, (source) => {
		const index = text.indexOf(source);

		if (index > MAX_INDEX) {
			return source;
		}
		const sourceValue = +source.replace(/[-—−]/, "-").replace("+", "");
		if (!Number.isNaN(sourceValue) && sourceValue === effectValue) {
			return source;
		}
		return `${effectValue} ↩ ${source}`;
	});
};
