import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import { addManyDownloadQueueItems } from "@modules/core/assets/download-queue/shared/lib";
import { selectArtworkUrl } from "@modules/core/theme/shared/lib";
import {
	selectSignatureGroups,
	setSignatureGroups,
} from "@modules/signature/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { createDownloadQueueItems } from "./lib";
import { compareSignatureGroups } from "./lib/compareSignatureGroups";
import { updateSignatureGroups } from "./updateSignatureGroups";

function* worker({ payload }: ReturnType<typeof updateSignatureGroups>) {
	yield put(setSignatureGroups(payload));

	const baseUrl: ReturnType<typeof selectArtworkUrl> =
		yield select(selectArtworkUrl);

	const ready: ReturnType<typeof selectExternalImagesReady> = yield select(
		selectExternalImagesReady,
	);
	const defaultGroups: ReturnType<typeof selectSignatureGroups> = yield select(
		selectSignatureGroups,
	);

	const groups = defaultGroups ?? [];

	const imageIds = compareSignatureGroups(groups, payload);

	if (!baseUrl) {
		return;
	}

	const downloadItems = imageIds.flatMap((code) =>
		createDownloadQueueItems({ code, baseUrl }),
	);

	const download = groups.length > 0 && ready && downloadItems.length > 0;

	if (download) {
		console.log("image id queue", imageIds);
		yield put(addManyDownloadQueueItems(downloadItems));
	}
}

export function* updateSignatureGroupsSaga() {
	yield takeEvery(updateSignatureGroups.match, worker);
}
