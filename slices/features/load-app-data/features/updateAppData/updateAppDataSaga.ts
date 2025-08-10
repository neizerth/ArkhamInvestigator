import {
	detectDefaultLanguage,
	setAvailableLanguages,
} from "@modules/core/i18n/shared/lib";
import { setMediaUpdateTime, setMediaVersion } from "@shared/lib";
import moment from "moment";
import { put, takeEvery } from "redux-saga/effects";
import { updateAppData } from "./updateAppData";

function* worker({ payload }: ReturnType<typeof updateAppData>) {
	const { languages, version } = payload;

	const updatedAt = moment().format();

	yield put(setMediaVersion(version));
	yield put(setMediaUpdateTime(updatedAt));
	yield put(setAvailableLanguages(languages));
	yield put(detectDefaultLanguage(languages));
}

export function* updateAppDataSaga() {
	yield takeEvery(updateAppData.match, worker);
}
