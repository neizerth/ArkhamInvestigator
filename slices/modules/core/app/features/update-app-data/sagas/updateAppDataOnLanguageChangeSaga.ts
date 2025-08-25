import { updateAppData } from "@modules/core/app/shared/lib";
import { setLanguage } from "@modules/core/i18n/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload: language }: ReturnType<typeof setLanguage>) {
	if (!language) {
		return;
	}

	yield put(
		updateAppData({
			language,
		}),
	);
}

export function* updateAppDataOnLanguageChangeSaga() {
	yield takeEvery(setLanguage.match, worker);
}
