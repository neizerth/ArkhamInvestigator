import { fork } from "redux-saga/effects";
import { ZoeySamarasParallelFastAbilityCheckFailedSaga } from "./fastCheckFailedSaga";
import { ZoeySamarasParallelFastAbilitySaga } from "./fastSaga";
import { ZoeySamarasParallelReactionAbilitySaga } from "./reactionSaga";

export function* ZoeySamarasParallelAbilitySaga() {
	yield fork(ZoeySamarasParallelReactionAbilitySaga);
	yield fork(ZoeySamarasParallelFastAbilitySaga);
	yield fork(ZoeySamarasParallelFastAbilityCheckFailedSaga);
}
