import { appInfoUpdated } from "@modules/core/app/shared/lib";
import { setAvailableLanguages } from "@modules/core/i18n/shared/lib";
import {
	setMediaUpdateTime,
	setMediaVersion,
} from "@modules/signature/shared/lib";
import moment from "moment";
import { put, takeEvery } from "redux-saga/effects";
import { updateAppInfo } from "./updateAppInfo";

function* worker({ payload }: ReturnType<typeof updateAppInfo>) {
	const { languages, version } = payload;

	const updatedAt = moment().format();

	yield put(setMediaVersion(version));
	yield put(setMediaUpdateTime(updatedAt));
	yield put(setAvailableLanguages(languages));

	yield put(appInfoUpdated(payload));
}

export function* updateAppInfoSaga() {
	yield takeEvery(updateAppInfo.match, worker);
}
