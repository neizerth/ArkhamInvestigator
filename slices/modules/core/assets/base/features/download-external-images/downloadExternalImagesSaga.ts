import { appUpdatesChecked } from "@modules/core/app/entities/checkAppUpdates";
import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import { assetDownloadEnd } from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import { unzip, unzipComplete } from "@modules/core/disk/entities/unzip/unzip";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { selectArtworkArchiveUrl } from "@modules/core/theme/shared/lib";
import { propEq } from "ramda";
import { isError } from "ramda-adjunct";
import { put, select, take, takeEvery } from "redux-saga/effects";
import {
	externalImagesArchiveDiskPath,
	externalImagesDiskPath,
	externalImagesFilename,
	externalImagesUrl,
} from "../../shared/config";
import {
	selectExternalImagesLoaded,
	setExternalAssetsDownloadedAt,
	setExternalImagesLoaded,
	setExternalImagesReady,
} from "../../shared/lib";

const downloadComplete = (action: unknown) => {
	if (!assetDownloadEnd.match(action)) {
		return false;
	}

	return action.payload.url === externalImagesUrl;
};

const matchUnzipComplete = (action: unknown) => {
	if (!unzipComplete.match(action)) {
		return false;
	}

	return action.payload.src === externalImagesArchiveDiskPath;
};

function* worker({ payload }: ReturnType<typeof appUpdatesChecked>) {
	const loaded: ReturnType<typeof selectExternalImagesLoaded> = yield select(
		selectExternalImagesLoaded,
	);

	const archiveUrl: ReturnType<typeof selectArtworkArchiveUrl> = yield select(
		selectArtworkArchiveUrl,
	);

	if (loaded || !archiveUrl) {
		return;
	}

	const asset = payload.assets.find(propEq(externalImagesFilename, "filename"));

	if (!asset) {
		console.log("asset not found");
		return;
	}

	const { size } = asset;

	console.log("downloading asset", archiveUrl);
	yield put(
		downloadAsset({
			size,
			url: archiveUrl,
			diskPath: externalImagesArchiveDiskPath,
			requiredSize: size * 2.5,
		}),
	);

	const resultAction: ReturnType<typeof assetDownloadEnd> =
		yield take(downloadComplete);

	if (resultAction.payload.status !== "success") {
		const { error } = resultAction.payload;
		const errorMessage = isError(error) ? error.message : String(error);

		yield put(
			sendNotification({
				type: "error",
				message: "error.downloadFailed",
				data: {
					error: errorMessage,
				},
			}),
		);
		return;
	}

	console.log("download complete", archiveUrl);
	yield put(setExternalImagesLoaded(true));

	yield put(
		unzip({
			src: externalImagesArchiveDiskPath,
			dest: externalImagesDiskPath,
			unlink: true,
		}),
	);

	yield take(matchUnzipComplete);

	yield put(setExternalImagesReady(true));
	yield put(setExternalAssetsDownloadedAt(Date()));
}

export function* downloadExternalImagesSaga() {
	yield takeEvery(appUpdatesChecked.match, worker);
}
