import type { ReturnAwaited } from "@shared/model";
import { call, put, take, takeEvery } from "redux-saga/effects";
import { DEFAULT_LANGUAGE } from "../../../shared/config";
import { loadLanguage, setLanguage } from "../../../shared/lib";
import { setTranslation } from "../setTranslation";
import { getTranslation } from "./getTranslation";
import { restoreTranslation, translationRestored } from "./restoreTranslation";

function* worker({ payload }: ReturnType<typeof restoreTranslation>) {
	const language = payload ?? DEFAULT_LANGUAGE;

	const translation: ReturnAwaited<typeof getTranslation> = yield call(
		getTranslation,
		language,
	);

	if (!translation) {
		yield put(loadLanguage(language));
		yield take(setLanguage.match);
		yield put(translationRestored(language));
		return;
	}

	yield put(
		setTranslation({
			language,
			translation,
		}),
	);

	yield put(translationRestored(language));
}

export function* restoreTranslationsSaga() {
	yield takeEvery(restoreTranslation.match, worker);
}
