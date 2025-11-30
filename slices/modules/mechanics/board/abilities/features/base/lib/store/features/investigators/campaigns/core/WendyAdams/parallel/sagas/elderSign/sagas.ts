import { fork } from "redux-saga/effects";
import { ParallelWendyAdamsOpenModalSaga } from "./openModalSaga";
import { ParallelWendyAdamsProcessModalActionSaga } from "./processModalActionSaga";
import { ParallelWendyAdamsReturnToModalSaga } from "./returnToModalSaga";

export function* ParallelWendyAdamsElderSignSaga() {
	yield fork(ParallelWendyAdamsOpenModalSaga);
	yield fork(ParallelWendyAdamsProcessModalActionSaga);
	yield fork(ParallelWendyAdamsReturnToModalSaga);
}
