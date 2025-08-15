import { spawn } from "redux-saga/effects";
import { changeSignatureModalActionSaga } from "./change-signature-modal-action/changeSignatureModalActionSaga";
import { syncBoardSignaturesSaga } from "./sync-board-signatures/syncBoardSignaturesSaga";

export function* signatureFeaturesSaga() {
	yield spawn(syncBoardSignaturesSaga);
	yield spawn(changeSignatureModalActionSaga);
}
