import { spawn } from "redux-saga/effects";
import { resetBoardAbilityUseSaga } from "./resetBoardAbilityUseSaga";
import { setBoardAbilityUseSaga } from "./setBoardAbilityUseSaga";
import { toggleBoardAbilityUseSaga } from "./toggleBoardAbilityUseSaga";

export function* abilityUseSaga() {
	yield spawn(toggleBoardAbilityUseSaga);
	yield spawn(setBoardAbilityUseSaga);
	yield spawn(resetBoardAbilityUseSaga);
}
