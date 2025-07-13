import { fork } from "redux-saga/effects";
import { closeModalEndChaosTokenRevealSaga } from "./closeModalEndChaosTokenRevealSaga";
import { handleCloseModalSaga } from "./handleCloseModalSaga";
import { openModalSaga } from "./openModalSaga";
import { returnBackSaga } from "./returnBack";

// TODO
export function* chaosTokenRevealModalSaga() {
	yield fork(returnBackSaga);
	yield fork(closeModalEndChaosTokenRevealSaga);
	yield fork(handleCloseModalSaga);
	yield fork(openModalSaga);
}
