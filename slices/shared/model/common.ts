import type * as fontFamily from "@assets/fonts";
import type { DeviceOrientationInfo } from "@modules/core/device/shared/model";
import type { Platform } from "react-native";
import type { EdgeInsets } from "react-native-safe-area-context";
import type { color, font, size } from "../config";

export type HasId<T = string> = {
	id: T;
};

export type AppThemePlatform = {
	os: typeof Platform.OS;
	ios: boolean;
	android: boolean;
	iosGestureControl: boolean;
};

export type AppTheme = {
	color: typeof color;
	font: typeof font;
	fontFamily: typeof fontFamily;
	size: typeof size;
	activeOpacity: number;
	orientation: DeviceOrientationInfo & {
		portrait: boolean;
		landscape: boolean;
	};
	platform: AppThemePlatform;
	artworksEnabled: boolean;
	navbarHeight: number;
	statusBarHeight: number;
	safeAreaInsets: EdgeInsets;
};

export type AppThemeProps = {
	theme: AppTheme;
};
