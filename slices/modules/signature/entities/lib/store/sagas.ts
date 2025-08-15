import { spawn } from "redux-saga/effects";
import { changeSignatureDetailsSaga } from "./features/changeSignatureDetails";
import { updateBoardSignaturesSaga } from "./features/updateBoardSignatures";

export function* signatureEntitiesSaga() {
	yield spawn(updateBoardSignaturesSaga);
	yield spawn(changeSignatureDetailsSaga);
}
