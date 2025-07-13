import { fork } from "redux-saga/effects";
import { boardSelectModalConfirmedSaga } from "../features/boardSelectModalConfirmed/boardSelectModalConfirmedSaga";
import { openBoardSelectModalSaga } from "../features/openBoardSelectModal/openBoardSelectModalSaga";

export function* boardSelectModalSaga() {
	yield fork(openBoardSelectModalSaga);
	yield fork(boardSelectModalConfirmedSaga);
}
