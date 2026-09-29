import * as fontFamily from "@assets/fonts";
import type { DeviceOrientationInfo } from "@modules/core/device/shared/model";
import { activeOpacity, color, font, size } from "@shared/config";
import type { AppTheme } from "@shared/model";
import { Platform } from "react-native";

type Options = {
	orientation: DeviceOrientationInfo;
	artworksEnabled: boolean;
};

export const getAppTheme = (options: Options): AppTheme => ({
	color,
	font,
	fontFamily,
	size,
	activeOpacity,
	os: Platform.OS,
	...options,
});
