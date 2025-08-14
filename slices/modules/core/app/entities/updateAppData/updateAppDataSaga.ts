import { appUpdated } from "@modules/core/app/shared/lib";
import { setAvailableLanguages } from "@modules/core/i18n/shared/lib";
import {
	setMediaUpdateTime,
	setMediaVersion,
} from "@modules/signature/shared/lib";
import moment from "moment";
import { put, takeEvery } from "redux-saga/effects";
import { updateAppData } from "./updateAppData";

function* worker({ payload }: ReturnType<typeof updateAppData>) {
	const { languages, version } = payload;

	const updatedAt = moment().format();

	yield put(setMediaVersion(version));
	yield put(setMediaUpdateTime(updatedAt));
	yield put(setAvailableLanguages(languages));

	yield put(appUpdated(payload));
}

export function* updateAppDataSaga() {
	yield takeEvery(updateAppData.match, worker);
}
