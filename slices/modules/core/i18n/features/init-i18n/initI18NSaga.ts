import { initAppUI } from "@modules/core/app/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { restoreTranslation } from "../../entities/translation/restoreTranslation";
import { selectLanguage } from "../../shared/lib";

function* worker() {
	const language: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	yield put(restoreTranslation(language));
}

export function* initI18NSaga() {
	yield takeEvery(initAppUI.match, worker);
}
