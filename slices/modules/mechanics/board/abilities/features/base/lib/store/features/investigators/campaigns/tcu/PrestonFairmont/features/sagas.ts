import { fork } from "redux-saga/effects";
import { PrestonFairmontOpenModalSaga } from "./openModal/openModalSaga";
import { PrestonFairmontConfirmModalSaga } from "./processAction/confirmModalSaga";
import { PrestonFairmontReturnToTestSaga } from "./returnToTest/returnToTestSaga";

export function* PrestonFairmontAbilitySaga() {
	yield fork(PrestonFairmontOpenModalSaga);
	yield fork(PrestonFairmontConfirmModalSaga);
	yield fork(PrestonFairmontReturnToTestSaga);
}
