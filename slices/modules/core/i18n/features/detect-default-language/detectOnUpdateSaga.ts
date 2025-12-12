import { appUpdatesChecked } from "@modules/core/app/entities/checkAppUpdates";
import { detectLanguage } from "@modules/core/i18n/entities/language/detectLanguage";
import { put, takeEvery } from "redux-saga/effects";
function* worker({ payload }: ReturnType<typeof appUpdatesChecked>) {
	const availableLanguages = payload.languages;

	yield put(
		detectLanguage({
			availableLanguages,
		}),
	);
}

export function* detectOnUpdateSaga() {
	yield takeEvery(appUpdatesChecked.match, worker);
}
