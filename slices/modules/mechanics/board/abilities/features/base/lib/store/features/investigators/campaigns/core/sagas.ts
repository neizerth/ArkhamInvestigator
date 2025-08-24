import { fork } from "redux-saga/effects";
import { AgnesBakerAbilitySaga } from "./AgnesBaker/sagas";
import { SkidsOTooleAbilitySaga } from "./SkidsOToole/sagas";

export function* CoreGameAbilitySaga() {
	yield fork(AgnesBakerAbilitySaga);
	yield fork(SkidsOTooleAbilitySaga);
}
