import type * as ScreenOrientation from "expo-screen-orientation";

export type DeviceOrientation = "landscape" | "portrait";

export type DeviceOrientationInfo = {
	orientation?: ScreenOrientation.Orientation;
	type?: DeviceOrientation;
};
