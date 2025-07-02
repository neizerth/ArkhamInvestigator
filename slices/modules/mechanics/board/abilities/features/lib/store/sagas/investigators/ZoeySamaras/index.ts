import { spawn } from "redux-saga/effects";
import { ZoeySamarasParallelAbilitySaga } from "./parallel";

export function* ZoeySamarasAbilitySaga() {
	yield spawn(ZoeySamarasParallelAbilitySaga);
}
