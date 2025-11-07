import { fork } from "redux-saga/effects";
import { ParallelFatherMateoOpenModalSaga } from "./openModalSaga";
import { ParallelFatherMateoProcessModalActionSaga } from "./processModalActionSaga";
import { ParallelFatherMateoReturnToRevealSaga } from "./returnToRevealSaga";

export function* ParallelFatherMateoReactionSaga() {
	yield fork(ParallelFatherMateoOpenModalSaga);
	yield fork(ParallelFatherMateoProcessModalActionSaga);
	yield fork(ParallelFatherMateoReturnToRevealSaga);
}
