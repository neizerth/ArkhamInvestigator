import type { ReturnAwaited } from "@shared/model";
import { call, put, race, take, takeEvery } from "redux-saga/effects";
import {
	loadLanguage,
	loadLanguageFailed,
	setLanguage,
} from "../../../shared/lib";
import { setTranslation } from "../setTranslation";
import { getTranslation } from "./getTranslation";
import { restoreTranslation, translationRestored } from "./restoreTranslation";

function* worker({ payload: language }: ReturnType<typeof restoreTranslation>) {
	if (!language) {
		return;
	}

	const translation: ReturnAwaited<typeof getTranslation> = yield call(
		getTranslation,
		language,
	);

	if (!translation) {
		yield put(loadLanguage(language));

		const { loaded }: { loaded?: unknown } = yield race({
			loaded: take(setLanguage.match),
			failed: take(loadLanguageFailed.match),
		});

		if (loaded) {
			yield put(translationRestored(language));
		}
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
