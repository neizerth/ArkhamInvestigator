import { spawn } from "redux-saga/effects";
import { setHostInviteCodeSaga } from "./setHostInviteCode/setHostInviteCodeSaga";
import { setZeroconfServiceSaga } from "./setZeroconfService/setZeroconfServiceSaga";
import { startMultiplayerGameSaga } from "./startMultiplayerGame/startMultiplayerGameSaga";

export function* multiplayerEntitiesSaga() {
	yield spawn(setHostInviteCodeSaga);
	yield spawn(setZeroconfServiceSaga);
	yield spawn(startMultiplayerGameSaga);
}
