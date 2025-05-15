import { useAppFonts } from "@features/i18n";
import { useSplashScreen } from "@shared/lib";
import { useAppAssets } from "./useAppAssets";

export const useAppLoader = () => {
	const assetsStatus = useAppAssets();
	const [fontsLoaded] = useAppFonts();

	const done = fontsLoaded && assetsStatus.done;

	useSplashScreen(done);

	return {
		assets: assetsStatus,
		fontsLoaded,
		done,
	};
};
