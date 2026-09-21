import { appLoaded } from "@modules/core/app/shared/lib";
import { minutes, takeOnce } from "@shared/lib";
import { delay, put } from "redux-saga/effects";
import { checkDownloadQueue } from "../../entitites/checkDownloadQueue/checkDownloadQueue";

function* worker() {
	while (true) {
		yield put(checkDownloadQueue());
		yield delay(minutes(5));
	}
}

export function* initDownloadQueueLoopSaga() {
	yield takeOnce(appLoaded.match, worker);
}
