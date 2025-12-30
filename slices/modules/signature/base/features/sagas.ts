import { spawn } from "redux-saga/effects";
import { changeSignatureModalActionSaga } from "./change-signature-modal-action/changeSignatureModalActionSaga";
import { resetTraumaOnNewGameSaga } from "./reset-trauma-on-new-game/resetTraumaOnNewGameSaga";
import { syncBoardSignaturesSaga } from "./sync-board-signatures/syncBoardSignaturesSaga";

export function* signatureBaseFeaturesSaga() {
	yield spawn(syncBoardSignaturesSaga);
	yield spawn(changeSignatureModalActionSaga);
	yield spawn(resetTraumaOnNewGameSaga);
}
