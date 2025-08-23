import { spawn } from "redux-saga/effects";
import { boardEntitiesSaga } from "./entities/sagas";
import { boardBaseFeaturesSaga } from "./features/sagas";
import { boardBaseSharedSaga } from "./shared/sagas";

export function* boardBaseSaga() {
	yield spawn(boardBaseSharedSaga);
	yield spawn(boardBaseFeaturesSaga);
	yield spawn(boardEntitiesSaga);
}
