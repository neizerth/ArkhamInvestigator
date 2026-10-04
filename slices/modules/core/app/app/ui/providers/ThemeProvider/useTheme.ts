import {
	selectNavbarHeight,
	selectSafeAreaInsets,
	selectScreenOrientation,
	selectScreenOrientationType,
} from "@modules/core/device/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { statusBarHeight } from "@shared/config";
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
					portrait: orientationType === "portrait",
					landscape: orientationType === "landscape",
				},
				artworksEnabled,
				navbarHeight,
				statusBarHeight,
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
