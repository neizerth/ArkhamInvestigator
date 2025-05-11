import { Platform, StatusBar } from "react-native";

import { getStatusBarHeight as getHeight } from "rn-statusbar-height";

export const DEFAULT_STATUS_BAR_HEIGHT = Platform.OS === "web" ? 10 : 40;

export const statusBarHeight = (() => {
	if (Platform.OS === "android") {
		return StatusBar.currentHeight || DEFAULT_STATUS_BAR_HEIGHT;
	}

	return getHeight() || DEFAULT_STATUS_BAR_HEIGHT;
})();
