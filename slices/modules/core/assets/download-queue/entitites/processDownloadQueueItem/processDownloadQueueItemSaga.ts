import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import {
	assetDownloadComplete,
	assetDownloadError,
} from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import { put, take, takeEvery } from "redux-saga/effects";
import {
	addDownloadQueueItem,
	removeDownloadQueueItemById,
} from "../../shared/lib";
import {
	downloadQueueItemFailed,
	downloadQueueItemSuccess,
	processDownloadQueueItem,
} from "./processDownloadQueueItem";

const filterResultAction = (url: string) => (action: unknown) => {
	if (assetDownloadComplete.match(action) || assetDownloadError.match(action)) {
		return action.payload.url === url;
	}
	return false;
};

type ResultAction = ReturnType<
	typeof assetDownloadComplete | typeof assetDownloadError
>;

function* worker({ payload }: ReturnType<typeof processDownloadQueueItem>) {
	yield put(removeDownloadQueueItemById(payload.id));

	yield put(downloadAsset(payload));

	const resultAction: ResultAction = yield take(
		filterResultAction(payload.url),
	);

	if (assetDownloadComplete.match(resultAction)) {
		yield put(
			downloadQueueItemSuccess({
				...payload,
				...resultAction.payload,
			}),
		);
		return;
	}

	yield put(addDownloadQueueItem(payload));

	yield put(
		downloadQueueItemFailed({
			...payload,
			...resultAction.payload,
		}),
	);
}

export function* processDownloadQueueItemSaga() {
	yield takeEvery(processDownloadQueueItem.match, worker);
}
