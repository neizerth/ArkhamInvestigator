import type { ReturnAwaited } from "@shared/model";
import { call, put, takeEvery } from "redux-saga/effects";
import { DEFAULT_LANGUAGE, translations } from "../../../shared/config";
import { StoreTranslation, loadLanguage } from "../../../shared/lib";
import { setTranslation } from "../setTranslation";
import { restoreTranslation, translationRestored } from "./restoreTranslation";

function* worker({ payload }: ReturnType<typeof restoreTranslation>) {
	const language = payload ?? DEFAULT_LANGUAGE;

	if (language === DEFAULT_LANGUAGE) {
		yield put(translationRestored(language));
		return;
	}

	const data: ReturnAwaited<typeof StoreTranslation.load> = yield call(
		StoreTranslation.load,
		language,
	);

	if (data) {
		const appTranslation = translations?.[language] || {};
		const translation = {
			...data,
			...appTranslation,
		};

		yield put(
			setTranslation({
				language,
				translation,
			}),
		);

		yield put(translationRestored(language));
		return;
	}

	yield put(loadLanguage(language));
}

export function* restoreTranslationsSaga() {
	yield takeEvery(restoreTranslation.match, worker);
}
