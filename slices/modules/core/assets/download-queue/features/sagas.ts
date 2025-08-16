import { spawn } from "redux-saga/effects";
import { watchQueueUpdateSaga } from "./watch-queue-update/watchQueueUpdateSaga";

export function* downloadQueueFeaturesSaga() {
	yield spawn(watchQueueUpdateSaga);
}
