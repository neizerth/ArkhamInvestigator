import { useLandscapeOrientation } from "@modules/core/device/entities/base/lib";
import { ITEM_SIZE } from "@modules/faction/shared/ui/faction-select/config";
import { size } from "@shared/config";
import { getGridItemSize } from "@shared/lib";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const minColumnsCount = 3;
export const maxImageSize = 100;

export const useImageSize = () => {
	const isLandscape = useLandscapeOrientation();
	const insets = useSafeAreaInsets();
	const window = useWindowDimensions();

	const horizontalInsets = insets.left + insets.right;

	const width = isLandscape
		? window.width - ITEM_SIZE - horizontalInsets
		: window.width;

	return getGridItemSize({
		containerSize: width,
		gap: size.gap.default,
		maxItemSize: maxImageSize,
		minCount: minColumnsCount,
		padding: size.gap.default * 2,
	});
};
