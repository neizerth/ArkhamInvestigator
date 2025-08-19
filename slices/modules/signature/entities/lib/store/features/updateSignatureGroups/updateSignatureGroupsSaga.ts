import { selectExternalImagesReady } from "@modules/core/assets/base/shared/lib";
import { addManyDownloadQueueItems } from "@modules/core/assets/download-queue/shared/lib";
import {
	selectSignatureGroups,
	setSignatureGroups,
} from "@modules/signature/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { createDownloadQueueItems } from "./lib";
import { compareSignatureGroups } from "./lib/compareSignatureGroups";
import { updateSignatureGroups } from "./updateSignatureGroups";

function* worker({ payload }: ReturnType<typeof updateSignatureGroups>) {
	const ready: ReturnType<typeof selectExternalImagesReady> = yield select(
		selectExternalImagesReady,
	);
	const defaultGroups: ReturnType<typeof selectSignatureGroups> = yield select(
		selectSignatureGroups,
	);

	const groups = defaultGroups ?? [];

	const imageIds = compareSignatureGroups(groups, payload);

	const downloadItems = imageIds.flatMap(createDownloadQueueItems);

	const download = groups.length > 0 && ready && downloadItems.length > 0;

	if (download) {
		console.log("image id queue", imageIds);
		yield put(addManyDownloadQueueItems(downloadItems));
	}
	yield put(setSignatureGroups(payload));
}

export function* updateSignatureGroupsSaga() {
	yield takeEvery(updateSignatureGroups.match, worker);
}
