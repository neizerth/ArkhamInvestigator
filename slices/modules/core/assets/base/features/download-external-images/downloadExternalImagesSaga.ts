import { appUpdatesChecked } from "@modules/core/app/entities/checkAppUpdates";
import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import { assetDownloadComplete } from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import { unzip, unzipComplete } from "@modules/core/disk/entities/unzip/unzip";
import { propEq } from "ramda";
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
	if (!assetDownloadComplete.match(action)) {
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

	if (loaded) {
		return;
	}

	const asset = payload.assets.find(propEq(externalImagesFilename, "filename"));

	if (!asset) {
		return;
	}

	const { size } = asset;

	yield put(
		downloadAsset({
			size,
			url: externalImagesUrl,
			diskPath: externalImagesArchiveDiskPath,
			requiredSize: size * 2.5,
		}),
	);

	yield take(downloadComplete);
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
