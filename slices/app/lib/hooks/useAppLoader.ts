import fonts from "@assets/fonts";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";

export const useAppLoader = () => {
	const [fontsLoaded] = useFonts(fonts);

	useEffect(() => {
		SplashScreen.hideAsync();

		if (Platform.OS !== "web") {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP,
			);
		}
	}, []);

	return fontsLoaded;
};
