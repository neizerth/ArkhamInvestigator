import { Platform, StatusBar } from "react-native";

import { getStatusBarHeight as getHeight } from "rn-statusbar-height";
import { IOS_WITH_GESTURE_CONTROL } from "./iphone";

export const DEFAULT_STATUS_BAR_HEIGHT = Platform.OS === "web" ? 10 : 40;

export const statusBarHeight = (() => {
	if (Platform.OS === "android") {
		return StatusBar.currentHeight || DEFAULT_STATUS_BAR_HEIGHT;
	}

	const gap = IOS_WITH_GESTURE_CONTROL ? 10 : 0;

	return Math.max(getHeight() + gap, DEFAULT_STATUS_BAR_HEIGHT);
})();
