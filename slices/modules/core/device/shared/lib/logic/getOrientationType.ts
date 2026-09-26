import { orientations } from "@shared/config";
import type * as ScreenOrientation from "expo-screen-orientation";
import type { DeviceOrientation } from "../../model";

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
