import { spawn } from "redux-saga/effects";
import { ZoeySamarasBaseReactionAbilitySaga } from "./base";
import { ZoeySamarasParallelAbilitySaga } from "./parallel";

export function* ZoeySamarasAbilitySaga() {
	yield spawn(ZoeySamarasParallelAbilitySaga);

	yield spawn(ZoeySamarasBaseReactionAbilitySaga);
}
