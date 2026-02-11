import { spawn } from "redux-saga/effects";
import { resetSignatureSelectionOnGameStartSaga } from "./reset-signature-selection-on-game-start/resetSignatureSelectionOnGameStartSaga";
import { setSelectedSignaturesOnGameStartSaga } from "./set-selected-signatures-on-game-start/setSelectedSignaturesOnGameStartSaga";
import { updateBoardFromSelectedSignature } from "./update-board-from-selected-signature/updateBoardFromSelectedSignature";

export function* signatureSelectionFeaturesSagas() {
	yield spawn(updateBoardFromSelectedSignature);
	yield spawn(setSelectedSignaturesOnGameStartSaga);
	yield spawn(resetSignatureSelectionOnGameStartSaga);
}
