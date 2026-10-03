import * as fontFamily from "@assets/fonts";
import type { DeviceOrientationInfo } from "@modules/core/device/shared/model";
import { activeOpacity, color, font, size } from "@shared/config";
import type { AppTheme } from "@shared/model";
import { Platform } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";

type Options = {
	orientation: DeviceOrientationInfo;
	artworksEnabled: boolean;
	navbarHeight: number;
	safeAreaInsets: EdgeInsets;
};

const os = Platform.OS;
const ios = os === "ios";
const android = os === "android";

export const getAppTheme = (options: Options): AppTheme => ({
	color,
	font,
	fontFamily,
	size,
	activeOpacity,
	platform: {
		os,
		ios,
		android,
	},
	...options,
});
