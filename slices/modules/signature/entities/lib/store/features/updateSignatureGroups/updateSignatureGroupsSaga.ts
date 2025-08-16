import { addManyDownloadQueueItems } from "@modules/core/assets/download-queue/shared/lib";
import {
	selectSignatureGroups,
	setSignatureGroups,
} from "@modules/signature/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { compareSignatureGroups } from "./compareSignatureGroups";
import { createDownloadQueueItems } from "./createDownloadQueueItems";
import { updateSignatureGroups } from "./updateSignatureGroups";

function* worker({ payload }: ReturnType<typeof updateSignatureGroups>) {
	const defaultGroups: ReturnType<typeof selectSignatureGroups> = yield select(
		selectSignatureGroups,
	);

	const groups = defaultGroups ?? [];

	const imageIds = compareSignatureGroups(groups, payload);

	const downloadItems = imageIds.flatMap(createDownloadQueueItems);

	if (downloadItems.length > 0) {
		yield put(addManyDownloadQueueItems(downloadItems));
	}
	yield put(setSignatureGroups(payload));
}

export function* updateSignatureGroupsSaga() {
	yield takeEvery(updateSignatureGroups.match, worker);
}
