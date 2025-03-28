import { color } from "@shared/config";

export const valueStyle = {
	color: color.white,
};

export const numberSize: Record<number, number> = {
	1: 55,
	2: 38,
	3: 25,
};

type GetValueStyleOptions = {
	defaultFontSize?: number;
	value: number | string;
};
export const getFontStyle = ({
	defaultFontSize,
	value,
}: GetValueStyleOptions) => {
	const digitsCount = value.toString().length;

	const fontSize = defaultFontSize || numberSize[digitsCount] || 0;

	return {
		fontSize,
	};
};
