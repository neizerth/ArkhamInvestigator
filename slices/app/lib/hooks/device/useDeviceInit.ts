import { useOrientationLock } from "@shared/lib";

import { color } from "@shared/config";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export const useDeviceInit = () => {
	useOrientationLock(ScreenOrientation.OrientationLock.PORTRAIT_UP);

	useEffect(() => {
		SystemUI.setBackgroundColorAsync(color.black);
	}, []);
};
