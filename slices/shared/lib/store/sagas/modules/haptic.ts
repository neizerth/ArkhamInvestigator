import { hapticFeaturesSaga } from "@modules/core/haptic/features/sagas";
import { spawn } from "redux-saga/effects";

export function* hapticSaga() {
	yield spawn(hapticFeaturesSaga);
}
