import { spawn } from "redux-saga/effects";
import { resetBoardAbilitiesSaga } from "./resetBoardAbilities/resetBoardAbilitiesSaga";
import { boardHistoryItemAddedSaga } from "./setBoardAbilityValue/boardHistoryItemAddedSaga";
import { setBoardAbilityValueSaga } from "./setBoardAbilityValue/setBoardAbilityValueSaga";
import { changeBoardHistoryAbilityUseSaga } from "./use/changeBoardHistoryAbilityUse/changeBoardHistoryAbilityUseSaga";

export function* abilitiesSharedSaga() {
	yield spawn(boardHistoryItemAddedSaga);

	yield spawn(setBoardAbilityValueSaga);
	yield spawn(resetBoardAbilitiesSaga);

	yield spawn(changeBoardHistoryAbilityUseSaga);
}
