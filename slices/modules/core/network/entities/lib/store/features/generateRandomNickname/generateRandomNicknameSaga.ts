import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { getDefaultNickname } from "../../../../../shared/lib";
import { changeNickname } from "../changeNickname";
import { generateRandomNickname } from "./generateRandomNickname";

function* worker() {
	const language: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);
	const nickname = getDefaultNickname(language);
	yield put(changeNickname(nickname));
}

export function* generateRandomNicknameSaga() {
	yield takeEvery(generateRandomNickname.match, worker);
}
