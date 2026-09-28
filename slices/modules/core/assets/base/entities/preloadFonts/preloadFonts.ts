import { setFontsLoaded } from "@modules/core/assets/base/shared/lib";
import { log } from "@modules/core/log/shared/config";
import { seconds } from "@shared/lib";
import { call, delay, put, race } from "redux-saga/effects";
import { preloadFontMap } from "./preloadFontMap";

// `expo-font`'s loadAsync has no guaranteed timeout of its own. The whole app-load chain
// (appLoadSaga) awaits this before ever dispatching setAppLoaded, so a font that never resolves
// (a bad/missing file, a native-module hiccup) would leave the loader spinning forever with no way
// out — same shape of bug as the untimed i18n restore this mirrors (initI18N already races a
// timeout for the same reason). Proceed with whatever fonts did load rather than block forever.
const preloadFontsTimeout = seconds(3);

export function* preloadFonts() {
	const { timeout }: { timeout?: boolean } = yield race({
		loaded: call(preloadFontMap),
		timeout: delay(preloadFontsTimeout),
	});

	if (timeout) {
		log.error(
			"preloadFonts: timed out, proceeding with fonts not fully loaded",
		);
	}

	yield put(setFontsLoaded(true));
}
