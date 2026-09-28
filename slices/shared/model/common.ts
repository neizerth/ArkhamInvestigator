import type * as fontFamily from "@assets/fonts";
import type { DeviceOrientationInfo } from "@modules/core/device/shared/model";
import type { Platform } from "react-native";
import type { color, font, size } from "../config";

export type HasId<T = string> = {
	id: T;
};

export type AppTheme = {
	color: typeof color;
	font: typeof font;
	fontFamily: typeof fontFamily;
	size: typeof size;
	activeOpacity: number;
	orientation: DeviceOrientationInfo;
	os: typeof Platform.OS;
};
