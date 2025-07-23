import { multiply } from "ramda";
import { chaosToken } from "../../config";
import { isNumericChaosTokenType } from "../../lib";
import type { ChaosTokenType } from "../../model";

type Options = {
	type: ChaosTokenType;
	modified?: boolean;
};
export const getChaosTokenValueColor = ({ type, modified }: Options) => {
	const color = chaosToken.color.types[type] || chaosToken.color.default;
	const isNumeric = isNumericChaosTokenType(type);
	if (!modified || !isNumeric) {
		return color;
	}

	return chaosToken.color.value.numeric;
};

export const getChaosTokenValueTextColor = (options: Options) => {
	if (!getChaosTokenValueStroke(options)) {
		return chaosToken.color.default;
	}
	return chaosToken.color.value.numeric;
};

export const getChaosTokenValueStroke = ({ type, modified }: Options) => {
	const isNumeric = isNumericChaosTokenType(type);

	if (!isNumeric) {
		return true;
	}

	return !modified;
};

export const getChaosTokenValueFontSizes = ({
	modified,
	sizes,
}: {
	modified?: boolean;
	sizes: number[];
}) => {
	if (!modified) {
		return sizes;
	}
	return sizes.map(multiply(1));
};
