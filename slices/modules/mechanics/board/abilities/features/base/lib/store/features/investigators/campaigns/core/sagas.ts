import { fork } from "redux-saga/effects";
import { AgnesBakerAbilitySaga } from "./AgnesBaker/sagas";

export function* CoreGameAbilitySaga() {
	yield fork(AgnesBakerAbilitySaga);
}
