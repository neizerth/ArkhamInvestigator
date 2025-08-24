import { fork } from "redux-saga/effects";
import { ZoeySamarasParallelFastAbilitySaga } from "./fast/sagas";
import { ZoeySamarasParallelReactionAbilitySaga } from "./reactionSaga";

export function* ZoeySamarasParallelAbilitySaga() {
	yield fork(ZoeySamarasParallelReactionAbilitySaga);
	yield fork(ZoeySamarasParallelFastAbilitySaga);
}
