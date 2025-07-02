import { spawn } from "redux-saga/effects";
import { ZoeySamarasParallelReactionAbilitySaga } from "./reaction";

export function* ZoeySamarasParallelAbilitySaga() {
	yield spawn(ZoeySamarasParallelReactionAbilitySaga);
}
