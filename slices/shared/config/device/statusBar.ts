import Constants from "expo-constants";
import { Platform, StatusBar } from "react-native";

export const DEFAULT_STATUS_BAR_HEIGHT = Platform.OS === "web" ? 10 : 40;

export const statusBarHeight = (() => {
	if (Platform.OS === "web") {
		return 10;
	}
	if (Platform.OS === "android") {
		return StatusBar.currentHeight || DEFAULT_STATUS_BAR_HEIGHT;
	}

	return Constants.statusBarHeight;
})();
