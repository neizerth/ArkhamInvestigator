import { spawn } from "redux-saga/effects";
import { routerSaga } from "../../effects/router/routerSaga";

export function* sharedSaga() {
	yield spawn(routerSaga);
}
