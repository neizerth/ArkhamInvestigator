import { modalEntitiesSaga } from "@modules/core/modal/entities/lib/store/sagas";
import { modalSharedSaga } from "@modules/core/modal/shared/base/lib/store/sagas";
import { spawn } from "redux-saga/effects";

export function* modalSaga() {
	yield spawn(modalSharedSaga);
	yield spawn(modalEntitiesSaga);
}
