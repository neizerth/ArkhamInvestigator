import { spawn } from "redux-saga/effects";
import { updateBoardSignaturesSaga } from "./updateBoardSignatures";

export function* signatureEntitiesSaga() {
	yield spawn(updateBoardSignaturesSaga);
}
