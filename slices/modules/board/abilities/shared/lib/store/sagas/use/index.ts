import { spawn } from "redux-saga/effects";
import { changeBoardHistoryAbilityUseSaga } from "./changeBoardHistoryAbilityUseSaga";
import { resetBoardAbilityUseSaga } from "./resetBoardAbilityUseSaga";
import { setBoardAbilityUseSaga } from "./setBoardAbilityUseSaga";
import { toggleBoardAbilityUseSaga } from "./toggleBoardAbilityUseSaga";

export function* abilityUseSaga() {
	yield spawn(toggleBoardAbilityUseSaga);
	yield spawn(setBoardAbilityUseSaga);
	yield spawn(resetBoardAbilityUseSaga);

	yield spawn(changeBoardHistoryAbilityUseSaga);
}
