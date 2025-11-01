import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import {
	type AssetSuccessfullyDownloadedPayload,
	assetDownloadEnd,
} from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import type { PayloadAction } from "@reduxjs/toolkit";
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

const filterResultAction =
	(url: string) =>
	(
		action: unknown,
	): action is PayloadAction<AssetSuccessfullyDownloadedPayload> => {
		if (assetDownloadEnd.match(action)) {
			return action.payload.status === "success" && action.payload.url === url;
		}
		return false;
	};

type ResultAction = ReturnType<typeof assetDownloadEnd>;

function* worker({ payload }: ReturnType<typeof processDownloadQueueItem>) {
	yield put(removeDownloadQueueItemById(payload.id));

	yield put(downloadAsset(payload));

	const filterAction = filterResultAction(payload.url);

	const resultAction: ResultAction = yield take(filterAction);

	if (resultAction.payload.status === "success") {
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
