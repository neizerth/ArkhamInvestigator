import { spawn } from "redux-saga/effects";
import { syncBoardSignaturesSaga } from "./sync-board-signatures/syncBoardSignaturesSaga";

export function* signatureFeaturesSaga() {
	yield spawn(syncBoardSignaturesSaga);
}
