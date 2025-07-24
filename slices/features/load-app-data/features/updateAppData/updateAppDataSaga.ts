import {
	detectDefaultLanguage,
	setAvailableLanguages,
} from "@modules/core/i18n/shared/lib";
import { loadInvestigatorsMediaData } from "@shared/api";
import {
	seconds,
	setIcons,
	setMediaUpdateTime,
	setMediaVersion,
} from "@shared/lib";
import type { ReturnAwaited } from "@shared/model";
import moment from "moment";
import { put, retry, takeEvery } from "redux-saga/effects";
import { getIconMapping } from "./getIconMapping";
import { updateAppData } from "./updateAppData";

function* worker() {
	const maxRetries = 3;

	const data: ReturnAwaited<typeof loadInvestigatorsMediaData> = yield retry(
		maxRetries,
		seconds(1),
		loadInvestigatorsMediaData,
	);
	const { icons, languages, version } = data;

	const iconMapping = getIconMapping(icons);

	const updatedAt = moment().format();

	yield put(setMediaVersion(version));
	yield put(setMediaUpdateTime(updatedAt));
	yield put(setAvailableLanguages(languages));
	yield put(setIcons(iconMapping));
	yield put(detectDefaultLanguage(languages));
}

export function* updateAppDataSaga() {
	yield takeEvery(updateAppData.match, worker);
}
