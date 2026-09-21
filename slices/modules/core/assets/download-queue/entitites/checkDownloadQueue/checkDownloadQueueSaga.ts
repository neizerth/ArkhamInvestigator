import { log } from "@modules/core/log/shared/config";
import { type Channel, buffers } from "redux-saga";
import { actionChannel, call, put, select, take } from "redux-saga/effects";
import { selectDownloadQueue } from "../../shared/lib/store";
import {
	downloadQueueItemFailed,
	downloadQueueItemSuccess,
	processDownloadQueueItem,
} from "../processDownloadQueueItem/processDownloadQueueItem";
import { checkDownloadQueue } from "./checkDownloadQueue";

const filterResultAction = (id: string) => (action: unknown) =>
	(downloadQueueItemSuccess.match(action) ||
		downloadQueueItemFailed.match(action)) &&
	action.payload.id === id;

type ResultAction = ReturnType<
	typeof downloadQueueItemSuccess | typeof downloadQueueItemFailed
>;

function* processQueue() {
	// failed items stay in the queue, skip them until the next check
	const failedIds = new Set<string>();

	while (true) {
		const queue: ReturnType<typeof selectDownloadQueue> =
			yield select(selectDownloadQueue);

		const item = queue.find(({ id }) => !failedIds.has(id));

		if (!item) {
			return;
		}

		yield put(processDownloadQueueItem(item));

		const action: ResultAction = yield take(filterResultAction(item.id));

		if (downloadQueueItemFailed.match(action)) {
			log.error("error downloading", item.url, String(action.payload.error));
			failedIds.add(item.id);
		}
	}
}

/**
 * Checks run one at a time; triggers that come during a check are merged into one more check,
 * so the same item is never downloaded twice and items added meanwhile are not missed.
 */
export function* checkDownloadQueueSaga() {
	const checks: Channel<ReturnType<typeof checkDownloadQueue>> =
		yield actionChannel(checkDownloadQueue.match, buffers.sliding(1));

	while (true) {
		yield take(checks);
		yield call(processQueue);
	}
}
