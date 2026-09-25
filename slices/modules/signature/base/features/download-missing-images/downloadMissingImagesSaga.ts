import { appLoaded } from "@modules/core/app/shared/lib";
import { downloadSignatureImages } from "@modules/signature/base/entities/lib/store/features/updateSignatureGroups/downloadSignatureImages";
import { selectSignatureGroups } from "@modules/signature/base/shared/lib";
import { takeOnce } from "@shared/lib";
import { call, select } from "redux-saga/effects";

/**
 * Heals images that were never downloaded: the update saga queues only what it sees
 * at the moment of an update, and nothing brings back a download it missed.
 */
function* worker() {
	const groups: ReturnType<typeof selectSignatureGroups> = yield select(
		selectSignatureGroups,
	);

	if (!groups?.length) {
		return;
	}

	yield call(downloadSignatureImages, { groups });
}

export function* downloadMissingImagesSaga() {
	yield takeOnce(appLoaded.match, worker);
}
