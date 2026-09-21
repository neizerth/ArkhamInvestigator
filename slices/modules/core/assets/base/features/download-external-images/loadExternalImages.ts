import {
	appUpdatesCheckFailed,
	appUpdatesChecked,
	checkAppUpdates,
} from "@modules/core/app/entities/checkAppUpdates";
import { filterInternetIsReachable } from "@modules/core/network/shared/lib";
import { selectArtworkArchiveUrl } from "@modules/core/theme/shared/lib";
import { seconds } from "@shared/lib";
import { type Channel, buffers } from "redux-saga";
import {
	actionChannel,
	call,
	delay,
	put,
	race,
	select,
	take,
} from "redux-saga/effects";
import {
	retryExternalImagesDownload,
	selectExternalImagesReady,
	setExternalImagesError,
} from "../../shared/lib";
import { downloadExternalImages } from "./downloadExternalImages";

type UpdatesResultAction = ReturnType<
	typeof appUpdatesChecked | typeof appUpdatesCheckFailed
>;

type RetryTrigger = {
	delay?: true;
	online?: unknown;
	retry?: unknown;
};

const retryDelays = [seconds(5), seconds(15), seconds(30), seconds(60)];

const getRetryDelay = (attempt: number) =>
	retryDelays[Math.min(attempt, retryDelays.length - 1)];

const matchUpdatesResult = (action: unknown) =>
	appUpdatesChecked.match(action) || appUpdatesCheckFailed.match(action);

/**
 * Artworks are required when enabled, so the loader waits here until the archive
 * is downloaded and unpacked, retrying on failure.
 */
export function* loadExternalImages() {
	const archiveUrl: ReturnType<typeof selectArtworkArchiveUrl> = yield select(
		selectArtworkArchiveUrl,
	);
	const ready: ReturnType<typeof selectExternalImagesReady> = yield select(
		selectExternalImagesReady,
	);

	if (!archiveUrl || ready) {
		return;
	}

	// The first update check is started on `appStarted`; the channel keeps its result
	// (and any later one) until we are ready to take it.
	const updates: Channel<UpdatesResultAction> = yield actionChannel(
		matchUpdatesResult,
		buffers.sliding(1),
	);

	try {
		for (let attempt = 0; ; attempt++) {
			const result: UpdatesResultAction = yield take(updates);

			if (appUpdatesChecked.match(result)) {
				const done: boolean = yield call(
					downloadExternalImages,
					result.payload,
					archiveUrl,
				);

				if (done) {
					return;
				}
			}

			yield put(setExternalImagesError(true));

			const trigger: RetryTrigger = yield race({
				delay: delay(getRetryDelay(attempt)),
				online: take(filterInternetIsReachable(true)),
				retry: take(retryExternalImagesDownload.match),
			});

			yield put(setExternalImagesError(false));

			// going online already triggers an update check
			if (!trigger.online) {
				yield put(checkAppUpdates({ notify: false }));
			}
		}
	} finally {
		updates.close();
	}
}
