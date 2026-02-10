import { selectCurrentLanguage } from "@modules/core/i18n/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { getDefaultNickname, setNickname } from "../../shared/lib";
import { generateRandomNickname } from "./generateRandomNickname";

function* worker() {
	const language: ReturnType<typeof selectCurrentLanguage> = yield select(
		selectCurrentLanguage,
	);
	const nickname = getDefaultNickname(language);
	yield put(setNickname(nickname));
}

export function* generateRandomNicknameSaga() {
	yield takeEvery(generateRandomNickname.match, worker);
}
