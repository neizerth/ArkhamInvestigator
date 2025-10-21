import { IOS_WITH_GESTURE_CONTROL } from "@shared/config";
import { Platform } from "react-native";

export const getPaddingBottom = () => {
	if (Platform.OS !== "ios" || !IOS_WITH_GESTURE_CONTROL) {
		return 65;
	}
	return 70;
};
