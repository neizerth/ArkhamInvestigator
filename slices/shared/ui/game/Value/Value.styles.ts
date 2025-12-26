import { color } from "../../../config";

export const valueStyle = {
	color: color.white,
};

export const defaultValueFontSizes: number[] = [1, 0.7, 0.54, 0.45];
export const minusZeroSize = 0.9;

type GetValueFontStyleOptions = {
	sizes?: number[];
	defaultFontSize?: number;
	value: number | string;
};

export const getValueOffset = (value: number | string) => {
	const strValue = value.toString();
	if (["+", "-"].includes(strValue[0])) {
		return -0.22;
	}

	return 0;
};

export const getFontStyle = ({
	sizes = defaultValueFontSizes,
	defaultFontSize = 55,
	value,
}: GetValueFontStyleOptions) => {
	const strValue = value.toString();
	const digitsCount = strValue.length;

	const index = Math.min(digitsCount - 1, sizes.length - 1);
	const k = strValue === "-0" ? minusZeroSize : 1;
	const size = sizes[index] * k;

	const fontSize = defaultFontSize * size;
	const marginLeft = fontSize * getValueOffset(value);

	return {
		fontSize,
		marginLeft,
	};
};
