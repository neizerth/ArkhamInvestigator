import { networkInfoUpdated } from "@modules/core/network/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { checkDownloadQueue } from "../../entitites/checkDownloadQueue/checkDownloadQueue";
import { addManyDownloadQueueItems } from "../../shared/lib";

function* worker() {
	yield put(checkDownloadQueue());
}

const filterActiveNetwork = (action: unknown) => {
	if (!networkInfoUpdated.match(action)) {
		return false;
	}

	return action.payload.isInternetReachable === true;
};

export function* watchQueueUpdateSaga() {
	yield takeEvery(addManyDownloadQueueItems.match, worker);
	yield takeEvery(filterActiveNetwork, worker);
}
