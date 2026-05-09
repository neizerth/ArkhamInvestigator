import { nicknameChanged } from "@modules/core/network/entities/lib/store/features/changeNickname";
import { restartTCPServer } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(restartTCPServer());
}

export function* restartTCPServerOnNicknameChangeSaga() {
	yield takeEvery(nicknameChanged.match, worker);
}
