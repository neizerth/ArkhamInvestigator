import { fork } from "redux-saga/effects";
import { Core2026IsabelleBarnesElderSignSaga } from "./elderSignSaga";
import { Core2026IsabelleBarnesFastSaga } from "./fastSaga";

export function* Core2026IsabelleBarnesSaga() {
	yield fork(Core2026IsabelleBarnesFastSaga);
	yield fork(Core2026IsabelleBarnesElderSignSaga);
}
