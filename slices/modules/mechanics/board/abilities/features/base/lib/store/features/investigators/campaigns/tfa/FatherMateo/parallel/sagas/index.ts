import { fork } from "redux-saga/effects";
import { ParallelFatherMateoElderSignSaga } from "./elderSign/elderSignSaga";
import { ParallelFatherMateoFastAbilitySaga } from "./fast/sagas";
import { ParallelFatherMateoReactionSaga } from "./reaction/sagas";

export function* ParallelFatherMateoSaga() {
	yield fork(ParallelFatherMateoFastAbilitySaga);
	yield fork(ParallelFatherMateoElderSignSaga);
	yield fork(ParallelFatherMateoReactionSaga);
}
