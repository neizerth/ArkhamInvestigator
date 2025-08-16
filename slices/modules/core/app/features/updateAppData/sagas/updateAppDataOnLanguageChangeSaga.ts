import { DEFAULT_LANGUAGE } from "@modules/core/i18n/shared/config";
import { setLanguage } from "@modules/core/i18n/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { updateAppData } from "../updateAppData";

function* worker({ payload }: ReturnType<typeof setLanguage>) {
	const language = payload ?? DEFAULT_LANGUAGE;

	yield put(
		updateAppData({
			language,
		}),
	);
}

export function* updateAppDataOnLanguageChangeSaga() {
	yield takeEvery(setLanguage.match, worker);
}
