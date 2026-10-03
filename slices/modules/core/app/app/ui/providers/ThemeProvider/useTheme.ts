import {
	selectNavbarHeight,
	selectSafeAreaInsets,
	selectScreenOrientation,
	selectScreenOrientationType,
} from "@modules/core/device/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { getAppTheme } from "./getAppTheme";

export const useTheme = () => {
	const orientation = useAppSelector(selectScreenOrientation);
	const orientationType = useAppSelector(selectScreenOrientationType);
	const artworksEnabled = useAppSelector(selectArtworksEnabled);
	const navbarHeight = useAppSelector(selectNavbarHeight);
	const safeAreaInsets = useAppSelector(selectSafeAreaInsets);

	return useMemo(
		() =>
			getAppTheme({
				orientation: {
					type: orientationType,
					orientation,
				},
				artworksEnabled,
				navbarHeight,
				safeAreaInsets,
			}),
		[
			orientation,
			orientationType,
			artworksEnabled,
			navbarHeight,
			safeAreaInsets,
		],
	);
};
