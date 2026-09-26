import type { activeOpacity, color, font, size } from "@shared/config";
import type { DeviceOrientation } from "@shared/model";
import type * as ScreenOrientation from "expo-screen-orientation";

type AppTheme = {
	color: typeof color;
	font: typeof font;
	size: typeof size;
	activeOpacity: typeof activeOpacity;
	orientation: {
		orientation?: ScreenOrientation.Orientation;
		type?: DeviceOrientation;
	};
};

declare module "styled-components" {
	export interface DefaultTheme extends AppTheme {}
}
