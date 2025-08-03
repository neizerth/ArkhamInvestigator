import { spawn } from "redux-saga/effects";
import { modalEntitiesSaga } from "./entities/base/lib/store/sagas";
import { modalFeaturesSaga } from "./features/sagas";
import { modalSharedSaga } from "./shared/base/lib/store/sagas";

export function* modalSaga() {
	yield spawn(modalSharedSaga);
	yield spawn(modalEntitiesSaga);
	yield spawn(modalFeaturesSaga);
}
