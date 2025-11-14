import { spawn } from "redux-saga/effects";
import { openUnsealMoonTokenConfirmSaga } from "./openUnsealMoonTokenConfirm/openUnsealMoonTokenConfirmSaga";
import { processMoonTokenModalActionSaga } from "./processMoonTokenModalAction/processMoonTokenModalActionSaga";

export function* unsealMoonTokenSaga() {
	yield spawn(openUnsealMoonTokenConfirmSaga);
	yield spawn(processMoonTokenModalActionSaga);
}
