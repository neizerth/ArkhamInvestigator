import { color } from "../../../config";

export const valueStyle = {
	color: color.white,
};

export const defaultFontSizes: number[] = [1, 0.7, 0.54];

type GetValueStyleOptions = {
	sizes?: number[];
	defaultFontSize?: number;
	value: number | string;
};

export const getFontStyle = ({
	sizes = defaultFontSizes,
	defaultFontSize = 55,
	value,
}: GetValueStyleOptions) => {
	const digitsCount = value.toString().length;

	const index = Math.min(digitsCount - 1, sizes.length - 1);

	const fontSize = defaultFontSize * sizes[index];

	return {
		fontSize,
	};
};
