import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

export const useSplashScreen = (hide: boolean) => {
	useEffect(() => {
		if (!hide) {
			return;
		}
		SplashScreen.hideAsync();
	}, [hide]);
};
