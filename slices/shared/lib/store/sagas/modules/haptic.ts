import { hapticFeaturesSaga } from "@modules/core/haptic/features/sagas";
import { hapticSharedSaga } from "@modules/core/haptic/shared/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* hapticSaga() {
	yield spawn(hapticSharedSaga);
	yield spawn(hapticFeaturesSaga);
}
