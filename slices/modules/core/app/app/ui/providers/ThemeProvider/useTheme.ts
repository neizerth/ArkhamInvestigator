import { useScreenOrientation } from "@modules/core/device/shared/lib";
import { selectArtworksEnabled } from "@modules/core/theme/shared/lib";
import { useAppSelector } from "@shared/lib";
import { useMemo } from "react";
import { getAppTheme } from "./getAppTheme";

export const useTheme = () => {
	const orientation = useScreenOrientation();
	const artworksEnabled = useAppSelector(selectArtworksEnabled);

	return useMemo(
		() => getAppTheme({ orientation, artworksEnabled }),
		[orientation, artworksEnabled],
	);
};
