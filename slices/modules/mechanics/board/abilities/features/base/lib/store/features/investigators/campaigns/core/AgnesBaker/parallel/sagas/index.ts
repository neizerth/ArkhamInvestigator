import { fork } from "redux-saga/effects";
import { ParallelAgnesBakerElderSignModalSaga } from "./elderSignModalSaga";
import { ParallelAgnesBakerHealModalActionSaga } from "./healModalActionSaga";
import { ParallelAgnesBakerReturnToRevealModalSaga } from "./returnToRevealModalSaga";

export function* ParallelAgnesBakerAbilitySaga() {
	yield fork(ParallelAgnesBakerElderSignModalSaga);
	yield fork(ParallelAgnesBakerReturnToRevealModalSaga);
	yield fork(ParallelAgnesBakerHealModalActionSaga);
}
