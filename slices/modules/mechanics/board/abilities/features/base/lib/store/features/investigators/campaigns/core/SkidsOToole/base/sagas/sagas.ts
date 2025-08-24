import { fork } from "redux-saga/effects";
import { BaseSkidsOTooleElderSignSaga } from "./elderSignSaga";
import { BaseSkidsOTooleFastAbilitySaga } from "./fast/sagas";

export function* BaseSkidsOTooleAbilitySaga() {
	yield fork(BaseSkidsOTooleFastAbilitySaga);
	yield fork(BaseSkidsOTooleElderSignSaga);
}
