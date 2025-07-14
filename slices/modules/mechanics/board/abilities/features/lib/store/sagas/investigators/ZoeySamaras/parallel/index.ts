import { fork } from "redux-saga/effects";
import { ZoeySamarasParallelReactionAbilitySaga } from "./reactionSaga";

export function* ZoeySamarasParallelAbilitySaga() {
	yield fork(ZoeySamarasParallelReactionAbilitySaga);
}
