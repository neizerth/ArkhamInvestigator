import { multiply } from "ramda";

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
