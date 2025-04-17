import fonts from "@shared/fonts";
import { useEffect, useState } from "react";

import { Asset } from "expo-asset";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";

import imageAssets from "@assets/images";
import { Platform } from "react-native";

export const useAppLoader = () => {
	const [fontsLoaded] = useFonts(fonts);
	const [assetsLoaded, setAssetsLoaded] = useState(false);

	useEffect(() => {
		Asset.loadAsync(imageAssets).then(() => setAssetsLoaded(true));
		SplashScreen.hideAsync();

		if (Platform.OS !== "web") {
			ScreenOrientation.lockAsync(
				ScreenOrientation.OrientationLock.PORTRAIT_UP,
			);
		}
	}, []);

	return fontsLoaded && assetsLoaded;
};
