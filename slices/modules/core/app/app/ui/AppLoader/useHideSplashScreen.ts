import { hideSplashScreen } from "@modules/core/device/entities/splash-screen";
import { useAppDispatch } from "@shared/lib";
import { useCallback, useEffect, useState } from "react";

const splashFallbackTimeout = 1000;

/** Hides the native splash once the loader logo draws; falls back if onLoad never fires. */
export const useHideSplashScreen = () => {
	const dispatch = useAppDispatch();
	const [splashHidden, setSplashHidden] = useState(false);

	const hideSplash = useCallback(() => {
		dispatch(hideSplashScreen());
		// Android removes the splash on the next drawn frame: the state change guarantees one
		setSplashHidden(true);
	}, [dispatch]);

	useEffect(() => {
		const timeout = setTimeout(hideSplash, splashFallbackTimeout);
		return () => clearTimeout(timeout);
	}, [hideSplash]);

	return { hideSplash, splashHidden };
};
