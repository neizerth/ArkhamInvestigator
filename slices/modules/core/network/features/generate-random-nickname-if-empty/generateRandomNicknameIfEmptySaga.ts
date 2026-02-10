import { appStarted } from "@modules/core/app/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { generateRandomNickname } from "../../entities/generateRandomNickname";
import { selectNickname } from "../../shared/lib";
function* worker() {
	const nickname: ReturnType<typeof selectNickname> =
		yield select(selectNickname);
	if (!nickname) {
		yield put(generateRandomNickname());
	}
}

export function* generateRandomNicknameIfEmptySaga() {
	yield takeEvery(appStarted.match, worker);
}
