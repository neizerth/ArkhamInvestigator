import { useScreenOrientation } from "@shared/lib";
import * as StatusBar from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";

export const useStatusBar = () => {
	const orientation = useScreenOrientation();
	useEffect(() => {
		const hideStatusBar = orientation.type === "landscape";
		StatusBar.setStatusBarHidden(hideStatusBar);
		return () => {
			StatusBar.setStatusBarHidden(false);

			if (Platform.OS === "android") {
				StatusBar.setStatusBarTranslucent(true);
			}
		};
	}, [orientation]);
};
