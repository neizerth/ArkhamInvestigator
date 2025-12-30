import { spawn } from "redux-saga/effects";
import { resetSignatureSelectionOnNewGameSaga } from "./reset-signature-selection-on-new-game/resetSignatureSelectionOnNewGameSaga";
import { setSelectedSignaturesOnGameStartSaga } from "./set-selected-signatures-on-game-start/setSelectedSignaturesOnGameStartSaga";
import { updateBoardFromSelectedSignature } from "./update-board-from-selected-signature/updateBoardFromSelectedSignature";

export function* signatureSelectionFeaturesSagas() {
	yield spawn(updateBoardFromSelectedSignature);
	yield spawn(resetSignatureSelectionOnNewGameSaga);
	yield spawn(setSelectedSignaturesOnGameStartSaga);
}
