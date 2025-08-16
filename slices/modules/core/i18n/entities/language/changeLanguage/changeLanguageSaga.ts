import { put, select, take, takeEvery } from "redux-saga/effects";
import { selectLanguage, setLanguage } from "../../../shared/lib";
import {
	restoreTranslation,
	translationRestored,
} from "../../translation/restoreTranslation";
import { changeLanguage } from "./changeLanguage";

function* worker({ payload: language }: ReturnType<typeof changeLanguage>) {
	const currentLanguage: ReturnType<typeof selectLanguage> =
		yield select(selectLanguage);

	if (!language || language === currentLanguage) {
		return;
	}

	yield put(restoreTranslation(language));

	const action: ReturnType<typeof translationRestored> =
		yield take(translationRestored);

	if (action.payload !== language) {
		return;
	}

	yield put(setLanguage(language));
}

export function* changeLanguageSaga() {
	yield takeEvery(changeLanguage.match, worker);
}
