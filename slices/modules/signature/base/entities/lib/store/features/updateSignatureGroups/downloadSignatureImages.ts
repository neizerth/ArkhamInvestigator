import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import {
	addManyDownloadQueueItems,
	selectDownloadQueue,
} from "@modules/core/assets/download-queue/shared/lib";
import { log } from "@modules/core/log/shared/config";
import { selectArtworkUrl } from "@modules/core/theme/shared/lib";
import type { InvestigatorSignatureGroup as Group } from "arkham-investigator-data";
import { call, put, select } from "redux-saga/effects";
import {
	type SignatureImageFile,
	createDownloadQueueItems,
	filterMissingSignatureImages,
	getSignatureImageFiles,
} from "./lib";

type Options = {
	groups: Group[];
	/** images with a new version: downloaded again even if they are on disk */
	changedIds?: string[];
};

/**
 * Queues the images the groups need: changed ones and the ones missing on disk.
 * The disk check makes a missed download (e.g. data updated without a version bump)
 * come back on the next run instead of staying a gray square.
 */
export function* downloadSignatureImages({ groups, changedIds = [] }: Options) {
	const baseUrl: ReturnType<typeof selectArtworkUrl> =
		yield select(selectArtworkUrl);

	// until the archive is unpacked the images come from it
	const ready: ReturnType<typeof selectExternalImagesReady> = yield select(
		selectExternalImagesReady,
	);

	if (!baseUrl || !ready) {
		return;
	}

	const changed = new Set(changedIds);
	const files = getSignatureImageFiles(groups);

	const changedFiles = files.filter(({ code }) => changed.has(code));

	const missingFiles: SignatureImageFile[] = yield call(
		filterMissingSignatureImages,
		files.filter(({ code }) => !changed.has(code)),
	);

	const queue: ReturnType<typeof selectDownloadQueue> =
		yield select(selectDownloadQueue);

	const queuedUrls = new Set(queue.map(({ url }) => url));

	const items = [...changedFiles, ...missingFiles]
		.flatMap((file) => createDownloadQueueItems({ ...file, baseUrl }))
		.filter(({ url }) => !queuedUrls.has(url));

	if (items.length === 0) {
		return;
	}

	log.info(
		"queueing signature images",
		items.map(({ diskPath }) => diskPath),
	);
	yield put(addManyDownloadQueueItems(items));
}
