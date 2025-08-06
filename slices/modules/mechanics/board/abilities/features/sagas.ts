import { spawn } from "redux-saga/effects";
import { boardAbilityBaseFeatureMechanicsSaga } from "./base/sagas";
import { watchBoardAbilityCheckSaga } from "./watch-board-ability-check/watchBoardAbilityCheckSaga";

export function* boardAbilitiesMechanicsFeatures() {
	yield spawn(boardAbilityBaseFeatureMechanicsSaga);
	yield spawn(watchBoardAbilityCheckSaga);
}
