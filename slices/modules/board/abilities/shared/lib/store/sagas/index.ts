import { spawn } from "redux-saga/effects";
import { resetBoardAbilitiesSaga } from "../features/resetBoardAbilities/resetBoardAbilitiesSaga";
import { boardHistoryItemAddedSaga } from "../features/setBoardAbilityValue/boardHistoryItemAddedSaga";
import { setBoardAbilityValueSaga } from "../features/setBoardAbilityValue/setBoardAbilityValueSaga";
import { changeBoardHistoryAbilityUseSaga } from "../features/use/changeBoardHistoryAbilityUse/changeBoardHistoryAbilityUseSaga";
import { resetBoardAbilityUseSaga } from "../features/use/resetBoardAbilityUseSaga/resetBoardAbilityUseSaga";
import { setBoardAbilityUseSaga } from "../features/use/setBoardAbilityUse/setBoardAbilityUseSaga";
import { toggleBoardAbilityUseSaga } from "../features/use/toggleBoardAbilityUse/toggleBoardAbilityUseSaga";

export function* abilitiesSharedSaga() {
	yield spawn(boardHistoryItemAddedSaga);

	yield spawn(setBoardAbilityValueSaga);
	yield spawn(resetBoardAbilitiesSaga);

	yield spawn(changeBoardHistoryAbilityUseSaga);
	yield spawn(resetBoardAbilityUseSaga);
	yield spawn(setBoardAbilityUseSaga);
	yield spawn(toggleBoardAbilityUseSaga);
}
