import type { ChaosTokenValue } from "@modules/chaos-bag/value/shared/model";
import { replaceCharacter } from "../config";
import { getEffectTokenValue } from "./getEffectTokenValue";

type Options = {
	text: string;
	value: ChaosTokenValue;
};

const MAX_INDEX = 20;

const formatEffectValue = (value: string) =>
	+value.replace(/[-—−]/, "-").replace("+", "");

export const replaceNumericEffectValue = ({ text, value }: Options) => {
	const effectValue = getEffectTokenValue(value);
	return text.replace(/([-—−+]\d+)/, (source) => {
		const index = text.indexOf(source);

		if (index > MAX_INDEX) {
			return source;
		}
		const sourceValue = formatEffectValue(source);
		const formattedEffectValue = formatEffectValue(effectValue.toString());
		if (!Number.isNaN(sourceValue) && sourceValue === formattedEffectValue) {
			return source;
		}
		return `${effectValue} ${replaceCharacter} ${source}`;
	});
};
