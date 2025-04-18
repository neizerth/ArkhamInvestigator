import fonts from "@assets/fonts";
import { useFonts } from "expo-font";
import * as ScreenOrientation from "expo-screen-orientation";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import assets from "@assets/images";
import { Image, Platform } from "react-native";
import FastImage from "react-native-fast-image";

const sources = assets.map((image) => {
	const { uri } = Image.resolveAssetSource(image);
	return { uri };
});

FastImage.preload(sources);

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
