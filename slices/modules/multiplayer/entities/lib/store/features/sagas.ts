import { spawn } from "redux-saga/effects";
import { setHostInviteCodeSaga } from "./setHostInviteCode/setHostInviteCodeSaga";

export function* multiplayerEntitiesSaga() {
	yield spawn(setHostInviteCodeSaga);
}
