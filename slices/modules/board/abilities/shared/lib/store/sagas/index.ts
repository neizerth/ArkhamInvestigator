import { spawn } from "redux-saga/effects";
import { boardHistoryItemAddedSaga } from "./boardHistoryItemAddedSaga";
import { changeBoardAbilityValueSaga } from "./changeBoardAbilityValueSaga";
import { resetBoardAbilitiesSaga } from "./resetBoardAbilitiesSaga";
import { abilityUseSaga } from "./use";

export function* abilitiesSaga() {
	yield spawn(boardHistoryItemAddedSaga);

	yield spawn(changeBoardAbilityValueSaga);
	yield spawn(resetBoardAbilitiesSaga);
	yield spawn(abilityUseSaga);
}
