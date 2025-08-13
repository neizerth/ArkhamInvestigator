import { spawn } from "redux-saga/effects";
import { hapticFeaturesSaga } from "./features/sagas";
import { hapticSharedSaga } from "./shared/lib/store/sagas";

export function* hapticSaga() {
	yield spawn(hapticSharedSaga);
	yield spawn(hapticFeaturesSaga);
}
