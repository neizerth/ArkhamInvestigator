import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import { assetDownloadEnd } from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import { put, take, takeEvery } from "redux-saga/effects";
import { removeDownloadQueueItemById } from "../../shared/lib";
import {
	downloadQueueItemFailed,
	downloadQueueItemSuccess,
	processDownloadQueueItem,
} from "./processDownloadQueueItem";

const filterResultAction = (url: string) => (action: unknown) =>
	assetDownloadEnd.match(action) && action.payload.url === url;

type ResultAction = ReturnType<typeof assetDownloadEnd>;

function* worker({ payload }: ReturnType<typeof processDownloadQueueItem>) {
	yield put(downloadAsset(payload));

	const { payload: result }: ResultAction = yield take(
		filterResultAction(payload.url),
	);

	if (result.status === "success") {
		// removed only now: an item survives an app restart in the middle of the download
		yield put(removeDownloadQueueItemById(payload.id));
		yield put(
			downloadQueueItemSuccess({
				...payload,
				uri: result.uri,
			}),
		);
		return;
	}

	// the item stays in the queue and is retried on the next queue check
	yield put(
		downloadQueueItemFailed({
			...payload,
			error: result.error,
		}),
	);
}

export function* processDownloadQueueItemSaga() {
	yield takeEvery(processDownloadQueueItem.match, worker);
}
