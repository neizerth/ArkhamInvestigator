import { Platform, StatusBar } from "react-native";

import { getStatusBarHeight as getHeight } from "rn-statusbar-height";
import { IOS_WITH_GESTURE_CONTROL } from "./iphone";

export const DEFAULT_STATUS_BAR_HEIGHT = Platform.OS === "web" ? 10 : 40;

export const statusBarHeight = (() => {
	if (Platform.OS === "android") {
		return StatusBar.currentHeight || DEFAULT_STATUS_BAR_HEIGHT;
	}

	const height = getHeight();

	if (!IOS_WITH_GESTURE_CONTROL) {
		return height;
	}

	return height <= 20 ? 54 : height;
})();
