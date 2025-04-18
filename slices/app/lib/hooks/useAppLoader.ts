import fonts from "@assets/fonts";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { Platform } from "react-native";

import * as SplashScreen from "expo-splash-screen";
import { useAppAssets } from "./useAppAssets";

export const useAppLoader = () => {
	const assetsStatus = useAppAssets();
	const [fontsLoaded] = useFonts(fonts);

	const done = fontsLoaded && assetsStatus.done;

	useEffect(() => {
		if (Platform.OS !== "web") {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP,
			);
		}
	}, []);

	useEffect(() => {
		if (!done) {
			return;
		}
		SplashScreen.hideAsync();
	}, [done]);

	return {
		assets: assetsStatus,
		fontsLoaded,
		done,
	};
};
