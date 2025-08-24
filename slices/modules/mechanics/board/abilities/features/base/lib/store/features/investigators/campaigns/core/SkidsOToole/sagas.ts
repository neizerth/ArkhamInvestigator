import { fork } from "redux-saga/effects";
import { BaseSkidsOTooleAbilitySaga } from "./base/sagas/sagas";

export function* SkidsOTooleAbilitySaga() {
	yield fork(BaseSkidsOTooleAbilitySaga);
}
