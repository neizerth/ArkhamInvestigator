import type * as fontFamily from "@assets/fonts";
import type { DeviceOrientationInfo } from "@modules/core/device/shared/model";
import type { activeOpacity, color, font, size } from "@shared/config";

type AppTheme = {
	color: typeof color;
	font: typeof font;
	fontFamily: typeof fontFamily;
	size: typeof size;
	activeOpacity: typeof activeOpacity;
	orientation: DeviceOrientationInfo;
};

declare module "styled-components" {
	export interface DefaultTheme extends AppTheme {}
}

declare module "styled-components/native" {
	export interface DefaultTheme extends AppTheme {}
}
