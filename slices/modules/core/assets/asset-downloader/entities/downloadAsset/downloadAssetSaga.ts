import { notEnoughSpace } from "@modules/core/disk/entities/notEnoughSpace";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { call, put, takeEvery } from "redux-saga/effects";
import { processAssetDownload } from "../processAssetDownload/processAssetDownload";
import { downloadAsset } from "./downloadAsset";

function* worker({ payload }: ReturnType<typeof downloadAsset>) {
	const { requiredSize } = payload;

	if (typeof requiredSize !== "number") {
		yield put(processAssetDownload(payload));
		return;
	}

	const freeSpace: ReturnAwaited<typeof FileSystem.getFreeDiskStorageAsync> =
		yield call(FileSystem.getFreeDiskStorageAsync);

	if (requiredSize > freeSpace) {
		yield put(
			notEnoughSpace({
				required: requiredSize,
				freeSpace,
			}),
		);
	}

	yield put(processAssetDownload(payload));
}

export function* downloadAssetSaga() {
	yield takeEvery(downloadAsset.match, worker);
}
