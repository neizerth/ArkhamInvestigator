import { spawn } from "redux-saga/effects";
import { changeBoardHistoryAbilityUseSaga } from "./changeBoardHistoryAbilityUse/changeBoardHistoryAbilityUseSaga";
import { resetBoardAbilityUseSaga } from "./resetBoardAbilityUseSaga/resetBoardAbilityUseSaga";
import { setBoardAbilityUseSaga } from "./setBoardAbilityUse/setBoardAbilityUseSaga";
import { toggleBoardAbilityUseSaga } from "./toggleBoardAbilityUse/toggleBoardAbilityUseSaga";

export function* boardAbilityUseSharedSagas() {
	yield spawn(changeBoardHistoryAbilityUseSaga);
	yield spawn(resetBoardAbilityUseSaga);
	yield spawn(setBoardAbilityUseSaga);
	yield spawn(toggleBoardAbilityUseSaga);
}
