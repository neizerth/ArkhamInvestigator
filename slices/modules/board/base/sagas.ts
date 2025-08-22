import { spawn } from "redux-saga/effects";
import { boardBaseFeaturesSaga } from "./features/sagas";
import { boardBaseSharedSaga } from "./shared/sagas";

export function* boardBaseSaga() {
	yield spawn(boardBaseSharedSaga);
	yield spawn(boardBaseFeaturesSaga);
}
