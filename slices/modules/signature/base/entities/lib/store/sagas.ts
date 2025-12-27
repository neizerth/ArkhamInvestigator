import { spawn } from "redux-saga/effects";
import { changeSignatureDetailsSaga } from "./features/changeSignatureDetails/changeSignatureDetailsSaga";
import { updateBoardSignaturesSaga } from "./features/updateBoardSignatures/updateBoardSignaturesSaga";
import { updateSignatureGroupsSaga } from "./features/updateSignatureGroups/updateSignatureGroupsSaga";

export function* signatureBaseEntitiesSaga() {
	yield spawn(updateBoardSignaturesSaga);
	yield spawn(changeSignatureDetailsSaga);
	yield spawn(updateSignatureGroupsSaga);
}
