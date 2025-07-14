import { fork, spawn } from "redux-saga/effects";
import { ZoeySamarasBaseReactionAbilitySaga } from "./baseSaga";
import { ZoeySamarasParallelAbilitySaga } from "./parallel";

export function* ZoeySamarasAbilitySaga() {
	yield spawn(ZoeySamarasParallelAbilitySaga);

	yield fork(ZoeySamarasBaseReactionAbilitySaga);
}
