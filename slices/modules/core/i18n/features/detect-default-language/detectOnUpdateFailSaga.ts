import { appUpdatesCheckFailed } from "@modules/core/app/entities/checkAppUpdates";
import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { restoreTranslation } from "../../entities/translation/restoreTranslation";
function* worker() {
	const currentLanguage: ReturnType<typeof selectCurrentLanguage> =
		yield select(selectCurrentLanguage);

	yield put(restoreTranslation(currentLanguage));
}

export function* detectOnUpdateFailSaga() {
	yield takeEvery(appUpdatesCheckFailed.match, worker);
}
