import * as fontFamily from "@assets/fonts";
import type { DeviceOrientationInfo } from "@modules/core/device/shared/model";
import { activeOpacity, color, font, size } from "@shared/config";

type AppTheme = {
	color: typeof color;
	font: typeof font;
	fontFamily: typeof fontFamily;
	size: typeof size;
	activeOpacity: typeof activeOpacity;
	orientation: DeviceOrientationInfo;
};

export const getAppTheme = (
	orientation: DeviceOrientationInfo = {},
): AppTheme => ({
	color,
	font,
	fontFamily,
	size,
	activeOpacity,
	orientation,
});
