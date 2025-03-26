import fonts from "@shared/fonts";
import { useEffect } from "react";

import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { Platform } from "react-native";

export const useAppLoader = () => {
	const response = useFonts(fonts);

	useEffect(() => {
		if (Platform.OS !== "web") {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP,
			);
		}
	}, []);

	useEffect(() => {
		SplashScreen.hideAsync();
	}, []);

	return response;
};
