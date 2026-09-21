import { downloadAsset } from "@modules/core/assets/asset-downloader/entities/downloadAsset/downloadAsset";
import { assetDownloadEnd } from "@modules/core/assets/asset-downloader/entities/processAssetDownload/processAssetDownload";
import {
	unzip,
	unzipComplete,
	unzipError,
} from "@modules/core/disk/entities/unzip/unzip";
import { log } from "@modules/core/log/shared/config";
import type { BuildInfo } from "arkham-investigator-data";
import { propEq } from "ramda";
import { call, put, select, take } from "redux-saga/effects";
import {
	externalImagesArchiveDiskPath,
	externalImagesDiskPath,
	externalImagesFilename,
} from "../../shared/config";
import {
	selectExternalImagesLoaded,
	setExternalAssetsDownloadedAt,
	setExternalImagesLoaded,
	setExternalImagesReady,
} from "../../shared/lib";

type DownloadEndAction = ReturnType<typeof assetDownloadEnd>;
type UnzipEndAction = ReturnType<typeof unzipComplete | typeof unzipError>;

const matchDownloadEnd = (url: string) => (action: unknown) =>
	assetDownloadEnd.match(action) && action.payload.url === url;

const matchUnzipEnd = (action: unknown) =>
	(unzipComplete.match(action) || unzipError.match(action)) &&
	action.payload.src === externalImagesArchiveDiskPath;

function* downloadArchive(info: BuildInfo, url: string) {
	const asset = info.assets.find(propEq(externalImagesFilename, "filename"));

	if (!asset) {
		log.warn("asset info not found", externalImagesFilename);
	}

	const size = asset?.size;

	log.info("downloading asset", url);
	yield put(
		downloadAsset({
			size,
			url,
			diskPath: externalImagesArchiveDiskPath,
			requiredSize: size && size * 2.5,
		}),
	);

	const { payload }: DownloadEndAction = yield take(matchDownloadEnd(url));

	if (payload.status !== "success") {
		log.error("download failed", url, String(payload.error));
		return false;
	}

	log.info("download complete", url);
	yield put(setExternalImagesLoaded(true));

	return true;
}

function* unzipArchive() {
	yield put(
		unzip({
			src: externalImagesArchiveDiskPath,
			dest: externalImagesDiskPath,
			unlink: true,
		}),
	);

	const action: UnzipEndAction = yield take(matchUnzipEnd);

	if (unzipError.match(action)) {
		log.error("unzip failed", action.payload.error);
		// the archive is broken or gone: download it again on the next attempt
		yield put(setExternalImagesLoaded(false));
		return false;
	}

	yield put(setExternalImagesReady(true));
	yield put(setExternalAssetsDownloadedAt(Date()));

	return true;
}

/**
 * Single attempt. Goes straight to unzip when the archive was downloaded
 * but the app was closed before it got unpacked.
 */
export function* downloadExternalImages(info: BuildInfo, url: string) {
	const loaded: ReturnType<typeof selectExternalImagesLoaded> = yield select(
		selectExternalImagesLoaded,
	);

	if (!loaded) {
		const downloaded: boolean = yield call(downloadArchive, info, url);

		if (!downloaded) {
			return false;
		}
	}

	const unzipped: boolean = yield call(unzipArchive);

	return unzipped;
}
