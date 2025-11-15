import { spawn } from "redux-saga/effects";
import { handleUnsealMoonTokenSaga } from "./handleUnsealMoonToken/handleUnsealMoonTokenSaga";
import { openUnsealMoonTokenConfirmSaga } from "./openUnsealMoonTokenConfirm/openUnsealMoonTokenConfirmSaga";
import { processMoonTokenModalActionSaga } from "./processMoonTokenModalAction/processMoonTokenModalActionSaga";
import { moonTokenReturnToRevealModalSaga } from "./returnToRevealOnCancel/returnToRevealOnCancelSaga";

export function* unsealMoonTokenSaga() {
	yield spawn(openUnsealMoonTokenConfirmSaga);
	yield spawn(processMoonTokenModalActionSaga);
	yield spawn(moonTokenReturnToRevealModalSaga);
	yield spawn(handleUnsealMoonTokenSaga);
}
