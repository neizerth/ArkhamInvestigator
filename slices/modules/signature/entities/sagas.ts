import { spawn } from "redux-saga/effects";
import { changeSignatureDetailsSaga } from "./changeSignatureDetails";
import { updateBoardSignaturesSaga } from "./updateBoardSignatures";

export function* signatureEntitiesSaga() {
	yield spawn(updateBoardSignaturesSaga);
	yield spawn(changeSignatureDetailsSaga);
}
