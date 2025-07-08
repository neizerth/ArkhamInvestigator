import { spawn } from "redux-saga/effects";
import { boardHistoryItemAddedSaga } from "./boardHistoryItemAddedSaga";
import { resetBoardAbilitiesSaga } from "./resetBoardAbilitiesSaga";
import { setBoardAbilityValueSaga } from "./setBoardAbilityValueSaga";
import { abilityUseSaga } from "./use";

export function* abilitiesSharedSaga() {
	yield spawn(boardHistoryItemAddedSaga);

	yield spawn(setBoardAbilityValueSaga);
	yield spawn(resetBoardAbilitiesSaga);
	yield spawn(abilityUseSaga);
}
