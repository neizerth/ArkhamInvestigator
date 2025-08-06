import { spawn } from "redux-saga/effects";
import { checkBoardAbilityUseSuccessSaga } from "./checkBoardAbilityUseSuccessSaga";

export function* checkBoardAbilityUseSaga() {
	yield spawn(checkBoardAbilityUseSuccessSaga);
}
