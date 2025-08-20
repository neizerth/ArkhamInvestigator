import { fork } from "redux-saga/effects";
import { BaseRexMurphyOpenModalSaga } from "./openModalSaga";

export function* BaseRexMurphyAbilitySaga() {
	yield fork(BaseRexMurphyOpenModalSaga);
}
