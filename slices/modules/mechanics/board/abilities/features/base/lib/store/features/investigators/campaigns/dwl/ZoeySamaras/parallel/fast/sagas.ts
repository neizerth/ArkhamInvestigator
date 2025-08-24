import { fork } from "redux-saga/effects";
import { ParallelZoeySamarasFastAbilityCheckFailedSaga } from "./fastCheckFailedSaga";
import { ParallelZoeySamarasRemoveChaosTokensSaga } from "./removeChaosTokensSaga";

export function* ZoeySamarasParallelFastAbilitySaga() {
	yield fork(ParallelZoeySamarasFastAbilityCheckFailedSaga);
	yield fork(ParallelZoeySamarasRemoveChaosTokensSaga);
}
