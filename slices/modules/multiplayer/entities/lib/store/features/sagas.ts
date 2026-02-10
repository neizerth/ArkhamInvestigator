import { spawn } from "redux-saga/effects";
import { setHostInviteCodeSaga } from "./setHostInviteCode/setHostInviteCodeSaga";
import { setZeroconfServiceSaga } from "./setZeroconfService/setZeroconfServiceSaga";

export function* multiplayerEntitiesSaga() {
	yield spawn(setHostInviteCodeSaga);
	yield spawn(setZeroconfServiceSaga);
}
