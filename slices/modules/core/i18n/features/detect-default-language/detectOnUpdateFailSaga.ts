import { appUpdatesCheckFailed } from "@modules/core/app/entities/checkAppUpdates";
import { detectLanguage } from "@modules/core/i18n/entities/language/detectLanguage";
import { selectAvailableLanguages } from "@modules/core/i18n/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
function* worker() {
	const availableLanguages: ReturnType<typeof selectAvailableLanguages> =
		yield select(selectAvailableLanguages);

	yield put(detectLanguage({ availableLanguages }));
}

export function* detectOnUpdateFailSaga() {
	yield takeEvery(appUpdatesCheckFailed.match, worker);
}
