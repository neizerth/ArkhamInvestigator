import { spawn } from "redux-saga/effects";
import { routerSharedSaga } from "./shared/sagas";

export function* routerSaga() {
	yield spawn(routerSharedSaga);
}
