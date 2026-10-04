import * as fontFamily from "@assets/fonts";
import {
	IOS_WITH_GESTURE_CONTROL,
	activeOpacity,
	color,
	font,
	size,
} from "@shared/config";
import type { AppTheme } from "@shared/model";
import { Platform } from "react-native";

type Options = Pick<
	AppTheme,
	| "orientation"
	| "artworksEnabled"
	| "navbarHeight"
	| "statusBarHeight"
	| "safeAreaInsets"
>;

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
		iosGestureControl: IOS_WITH_GESTURE_CONTROL,
	},
	...options,
});
