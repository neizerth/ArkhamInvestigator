import { put, select, takeEvery } from "redux-saga/effects";
import { selectLanguage } from "../../../shared/lib";
import { restoreTranslation } from "../../translation/restoreTranslation";
import { changeLanguage } from "./changeLanguage";

function* worker({ payload: language }: ReturnType<typeof changeLanguage>) {
	const currentLanguage: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	if (!language || language === currentLanguage) {
		return;
	}

	yield put(restoreTranslation(language));
}

export function* changeLanguageSaga() {
	yield takeEvery(changeLanguage.match, worker);
}
