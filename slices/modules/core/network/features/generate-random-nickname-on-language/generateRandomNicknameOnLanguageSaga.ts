import { setLanguage } from "@modules/core/i18n/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { generateRandomNickname } from "../../entities/lib/store/features/generateRandomNickname";
function* worker() {
	yield put(generateRandomNickname());
}

export function* generateRandomNicknameOnLanguageSaga() {
	yield takeEvery(setLanguage.match, worker);
}
