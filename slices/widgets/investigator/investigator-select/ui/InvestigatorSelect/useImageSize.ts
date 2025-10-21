import { size } from "@shared/config";
import { getGridItemSize } from "@shared/lib";
import { useWindowDimensions } from "react-native";

export const minColumnsCount = 3;
export const maxImageSize = 100;

export const useImageSize = () => {
	const { width } = useWindowDimensions();

	return getGridItemSize({
		containerSize: width,
		gap: size.gap.default,
		maxItemSize: maxImageSize,
		minCount: minColumnsCount,
		padding: size.gap.default * 2,
	});
};
