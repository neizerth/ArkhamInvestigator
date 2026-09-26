import { orientations } from "@shared/config";
import type { DeviceOrientation } from "@shared/model";
import type * as ScreenOrientation from "expo-screen-orientation";

type OrientationType = DeviceOrientation;

export const getOrientationType = (
	orientation?: ScreenOrientation.Orientation,
): OrientationType | undefined => {
	if (!orientation) {
		return;
	}
	if (orientations.landscape.includes(orientation)) {
		return "landscape";
	}
	if (orientations.portrait.includes(orientation)) {
		return "portrait";
	}
	return;
};
