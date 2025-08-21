import { put, select, take, takeEvery } from "redux-saga/effects";
import {
	selectDownloadQueueSize,
	selectFirstDownloadQueueItem,
} from "../../shared/lib/store";
import {
	downloadQueueItemFailed,
	downloadQueueItemSuccess,
	processDownloadQueueItem,
} from "../processDownloadQueueItem/processDownloadQueueItem";
import { checkDownloadQueue } from "./checkDownloadQueue";

const filterResultAction = (url: string) => (action: unknown) => {
	if (
		downloadQueueItemSuccess.match(action) ||
		downloadQueueItemFailed.match(action)
	) {
		return action.payload.url === url;
	}

	return false;
};

type ReturnAction = ReturnType<
	typeof downloadQueueItemSuccess | typeof downloadQueueItemFailed
>;

function* worker() {
	const size: ReturnType<typeof selectDownloadQueueSize> = yield select(
		selectDownloadQueueSize,
	);

	if (size === 0) {
		return;
	}

	for (let i = 0; i < size; i++) {
		const item: ReturnType<typeof selectFirstDownloadQueueItem> = yield select(
			selectFirstDownloadQueueItem,
		);

		if (!item) {
			return;
		}

		yield put(processDownloadQueueItem(item));

		const action: ReturnAction = yield take(filterResultAction(item.url));

		if (downloadQueueItemFailed.match(action)) {
			console.log("error downloading", action.payload);
		}
	}
}

export function* checkDownloadQueueSaga() {
	yield takeEvery(checkDownloadQueue.match, worker);
}
