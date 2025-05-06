import fonts from "@assets/fonts";
import { useSplashScreen } from "@shared/lib";
import { useFonts } from "expo-font";
import { useAppAssets } from "./useAppAssets";

export const useAppLoader = () => {
	const assetsStatus = useAppAssets();
	const [fontsLoaded] = useFonts(fonts);

	const done = fontsLoaded && assetsStatus.done;

	useSplashScreen(done);

	return {
		assets: assetsStatus,
		fontsLoaded,
		done,
	};
};
