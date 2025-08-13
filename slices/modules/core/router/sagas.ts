import { spawn } from "redux-saga/effects";
import { routerEntitiesSaga } from "./entities/sagas";

export function* routerSaga() {
	yield spawn(routerEntitiesSaga);
}
