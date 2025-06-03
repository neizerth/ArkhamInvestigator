import { color } from "../../../config";

export const valueStyle = {
	color: color.white,
};

export const numberSize: Record<number, number> = {
	1: 1,
	2: 0.7,
	3: 0.54,
};

type GetValueStyleOptions = {
	defaultFontSize?: number;
	value: number | string;
};

export const getFontStyle = ({
	defaultFontSize = 55,
	value,
}: GetValueStyleOptions) => {
	const digitsCount = value.toString().length;

	const fontSize = defaultFontSize * numberSize[digitsCount];

	return {
		fontSize,
	};
};
