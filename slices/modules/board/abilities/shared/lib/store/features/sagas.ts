import { spawn } from "redux-saga/effects";
import { resetBoardAbilitiesSaga } from "./resetBoardAbilities/resetBoardAbilitiesSaga";
import { boardHistoryItemAddedSaga } from "./setBoardAbilityValue/boardHistoryItemAddedSaga";
import { setBoardAbilityValueSaga } from "./setBoardAbilityValue/setBoardAbilityValueSaga";
import { boardAbilityUseSharedSaga } from "./use/sagas";

export function* boardAbilitySharedSaga() {
	yield spawn(boardHistoryItemAddedSaga);

	yield spawn(setBoardAbilityValueSaga);
	yield spawn(resetBoardAbilitiesSaga);

	yield spawn(boardAbilityUseSharedSaga);
}
