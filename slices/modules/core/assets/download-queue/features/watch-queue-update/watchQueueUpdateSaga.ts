import { filterInternetIsReachable } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { checkDownloadQueue } from "../../entitites/checkDownloadQueue/checkDownloadQueue";
import { addManyDownloadQueueItems } from "../../shared/lib";

function* worker() {
	yield put(checkDownloadQueue());
}

export function* watchQueueUpdateSaga() {
	yield takeEvery(addManyDownloadQueueItems.match, worker);
	yield takeEvery(filterInternetIsReachable(true), worker);
}
