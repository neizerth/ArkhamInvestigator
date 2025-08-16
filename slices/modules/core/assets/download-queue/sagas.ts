import { spawn } from "redux-saga/effects";
import { downloadQueueEntitiesSaga } from "./entitites/sagas";
import { downloadQueueFeaturesSaga } from "./features/sagas";

export function* downloadQueueSaga() {
	yield spawn(downloadQueueEntitiesSaga);
	yield spawn(downloadQueueFeaturesSaga);
}
