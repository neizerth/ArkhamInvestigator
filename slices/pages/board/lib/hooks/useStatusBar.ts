import { useScreenOrientation } from "@shared/lib";
import * as StatusBar from "expo-status-bar";
import { useEffect } from "react";

export const useStatusBar = () => {
	const orientation = useScreenOrientation();
	useEffect(() => {
		const hideStatusBar = orientation.type === "landscape";
		StatusBar.setStatusBarHidden(hideStatusBar);
		return () => {
			StatusBar.setStatusBarHidden(false);
			StatusBar.setStatusBarTranslucent(true);
		};
	}, [orientation]);
};
