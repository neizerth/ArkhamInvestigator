import { useScreenOrientation } from "@modules/core/device/shared/lib";
import { activeOpacity, color, font, size } from "@shared/config";
import { useMemo } from "react";
import type { DefaultTheme } from "styled-components";

export const useTheme = () => {
	const orientation = useScreenOrientation();

	return useMemo((): DefaultTheme => {
		return {
			color,
			font,
			size,
			activeOpacity,
			orientation,
		};
	}, [orientation]);
};
