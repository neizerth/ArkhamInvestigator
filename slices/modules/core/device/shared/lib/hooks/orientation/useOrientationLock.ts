import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { Platform } from "react-native";

const isWeb = Platform.OS === "web";

export const useOrientationLock = (
	orientation: ScreenOrientation.OrientationLock,
) => {
	useEffect(() => {
		if (isWeb) {
			return;
		}
		ScreenOrientation.lockAsync(orientation);
	}, [orientation]);
};
