import { initAppUI } from "@modules/core/app/shared/lib";
import { minutes } from "@shared/lib";
import { delay, put, takeEvery } from "redux-saga/effects";
import { checkDownloadQueue } from "../../entitites/checkDownloadQueue/checkDownloadQueue";

function* worker() {
	while (true) {
		yield put(checkDownloadQueue());
		yield delay(minutes(5));
	}
}

export function* initDownloadQueueLoopSaga() {
	yield takeEvery(initAppUI.match, worker);
}
