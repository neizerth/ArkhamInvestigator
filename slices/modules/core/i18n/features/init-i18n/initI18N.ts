import { seconds } from "@shared/lib";
import { delay, put, race, select, take } from "redux-saga/effects";
import {
	restoreTranslation,
	translationRestored,
} from "../../entities/translation/restoreTranslation";
import { selectLanguage } from "../../shared/lib";

// a translation missing on disk is downloaded, don't keep the splash screen for too long
const restoreTimeout = seconds(5);

const matchTranslationRestored = (language: string) => (action: unknown) =>
	translationRestored.match(action) && action.payload === language;

export function* initI18N() {
	const language: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	if (!language) {
		return;
	}

	yield put(restoreTranslation(language));

	yield race({
		restored: take(matchTranslationRestored(language)),
		timeout: delay(restoreTimeout),
	});
}
