import { spawn } from "redux-saga/effects";
import { toggleBoardAbilityUseSaga } from "./toggleBoardAbilityUseSaga";

export function* useAbilitiesSaga() {
	yield spawn(toggleBoardAbilityUseSaga);
}
