import * as ScreenOrientation from "expo-screen-orientation";

import { PixelRatio, Platform } from "react-native";
import { capitalize } from "../../lib/util/string";

import { getNavigationBarHeight } from "react-native-android-navbar-height";
import type {
	BreakpointSize,
	DeviceBreakpointType,
	DeviceBreakpoints,
	DeviceType,
} from "../../model";
import { iOSVersion } from "./ios";

const isAndroid = Platform.OS === "android";

export const navBarHeight = isAndroid ? getNavigationBarHeight() : 0;
export const isNavbarVisible = navBarHeight > 0;

export const IS_WEB = Platform.OS === "web";

export const HAVE_AVIF_SUPPORT =
	iOSVersion.gte("16.0") ||
	(Platform.OS === "android" && Platform.Version >= 12);

export const breakpoints: DeviceBreakpoints = {
	default: {
		small: 0,
		medium: 280,
		large: 300,
	},
	mobile: {
		small: 320,
		medium: 375,
		large: 425,
	},
	tablet: {
		small: 768,
		medium: 1024,
		large: 1366,
	},
	desktop: {
		small: 1440,
		medium: 1920,
		large: 2560,
	},
};

export const deviceTypes: DeviceType[] = [
	"default",
	"mobile",
	"tablet",
	"desktop",
];
export const breakpointSizes: BreakpointSize[] = ["small", "medium", "large"];

export const breakpointsOrder: DeviceBreakpointType[] = deviceTypes.flatMap(
	(deviceType) =>
		breakpointSizes.map(
			(size) => `${deviceType}${capitalize(size)}` as DeviceBreakpointType,
		),
);

export const orientations = {
	landscape: [
		ScreenOrientation.Orientation.LANDSCAPE_LEFT,
		ScreenOrientation.Orientation.LANDSCAPE_RIGHT,
	],
	portrait: [
		ScreenOrientation.Orientation.PORTRAIT_DOWN,
		ScreenOrientation.Orientation.PORTRAIT_UP,
	],
};

export const DPR = PixelRatio.get();

export const DEVICE_FONT_SCALE = PixelRatio.getFontScale();
