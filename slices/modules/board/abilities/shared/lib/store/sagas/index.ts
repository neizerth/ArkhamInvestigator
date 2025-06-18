import { spawn } from "redux-saga/effects";
import { changeBoardAbilityValueSaga } from "./changeBoardAbilityValueSaga";
import { resetBoardAbilitiesSaga } from "./resetBoardAbilitiesSaga";

export function* abilitiesSaga() {
	yield spawn(changeBoardAbilityValueSaga);
	yield spawn(resetBoardAbilitiesSaga);
}
