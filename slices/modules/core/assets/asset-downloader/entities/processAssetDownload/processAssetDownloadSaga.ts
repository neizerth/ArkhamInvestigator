import { deviceAppStateChanged } from "@modules/core/device/shared/lib";
import { internetReachabilityChanged } from "@modules/core/network/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { END, type Channel as SagaChannel } from "redux-saga";
import {
	actionChannel,
	call,
	put,
	race,
	select,
	take,
} from "redux-saga/effects";
import {
	clearAssetDownload,
	initAssetDownload,
	removeInterrupted,
	selectInterrupted,
	setAssetDownloadedSize,
	setAssetSize,
	setInterrupted,
} from "../../shared/lib";
import { type DownloadChannelData, downloadChannel } from "./downloadChannel";
import { assetDownloadEnd, processAssetDownload } from "./processAssetDownload";

type Download = ReturnType<typeof downloadChannel>;
type ProcessAction = ReturnType<typeof processAssetDownload>;
type NextEvent = {
	item?: DownloadChannelData | typeof END;
	pause?: unknown;
};

/**
 * How an interrupted download continues:
 * - Android: `resumeData` is the size of the partial file, it is sent as a `Range` header;
 * - iOS: `resumeData` is an opaque blob, available only from a pause, so the download
 *   is paused before the app goes to background or loses the internet.
 */
const resumeMode =
	Platform.OS === "android" ? "file" : Platform.OS === "ios" ? "pause" : null;

class HttpError extends Error {}
class PauseError extends Error {}

const getFilePath = (diskPath: string) =>
	FileSystem.documentDirectory + diskPath;

const matchPauseTrigger = (action: unknown) =>
	(deviceAppStateChanged.match(action) && action.payload === "background") ||
	(internetReachabilityChanged.match(action) && action.payload === false);

function* getResumeData(url: string, diskPath: string) {
	const interrupted: ReturnType<typeof selectInterrupted> =
		yield select(selectInterrupted);

	const entry = interrupted?.[url];

	if (entry === undefined) {
		return;
	}

	if (resumeMode === "pause") {
		return entry ?? undefined;
	}

	if (resumeMode !== "file") {
		return;
	}

	const info: ReturnAwaited<typeof FileSystem.getInfoAsync> = yield call(
		FileSystem.getInfoAsync,
		getFilePath(diskPath),
	);

	if (!info.exists || !info.size) {
		return;
	}

	return String(info.size);
}

function* pauseDownload(url: string, pause: Download["pause"]) {
	try {
		const { resumeData }: ReturnAwaited<Download["pause"]> = yield call(pause);

		if (resumeData) {
			yield put(setInterrupted({ url, resumeData }));
		}
	} catch {
		// the download has already finished or failed: its own result tells what happened
	}

	throw new PauseError("Download paused");
}

function* worker({ payload }: ProcessAction) {
	const { url, diskPath } = payload;

	yield put(initAssetDownload(payload));

	const resumeData: string | undefined = yield call(
		getResumeData,
		url,
		diskPath,
	);

	const { channel, pause }: Download = yield call(downloadChannel, {
		...payload,
		resumeData,
	});

	const next = {
		item: take(channel),
		...(resumeMode === "pause" && { pause: take(matchPauseTrigger) }),
	};

	let first = true;
	try {
		while (true) {
			const event: NextEvent = yield race(next);

			if (event.pause) {
				yield call(pauseDownload, url, pause);
			}

			const item = event.item as DownloadChannelData | typeof END;

			if (item.type === END.type) {
				break;
			}
			if (item.type === "result") {
				const result = item.value;

				// paused download resolves without a result
				if (!result) {
					throw new Error("Download interrupted");
				}
				// expo resolves on HTTP errors too, with the error body written to disk
				if (result.status >= 400) {
					throw new HttpError(`HTTP ${result.status}`);
				}

				yield put(removeInterrupted(url));
				yield put(
					assetDownloadEnd({
						...payload,
						status: "success",
						uri: result.uri,
					}),
				);

				break;
			}
			if (item.type === "error") {
				throw item.value;
			}

			const { totalBytesExpectedToWrite, totalBytesWritten } = item.value;

			if (first && totalBytesExpectedToWrite > 0) {
				yield put(setAssetSize(totalBytesExpectedToWrite));
			}
			first = false;
			yield put(setAssetDownloadedSize(totalBytesWritten));
		}
	} catch (error) {
		if (error instanceof HttpError) {
			// the file holds an error body (appended to the partial file on resume): start over next time
			yield put(removeInterrupted(url));
			yield call(FileSystem.deleteAsync, getFilePath(diskPath), {
				idempotent: true,
			});
		} else if (resumeMode === "file") {
			yield put(setInterrupted({ url, resumeData: null }));
		} else if (resumeMode === "pause" && !(error instanceof PauseError)) {
			// the stored blob did not work (e.g. the system removed the temp file): start over next time
			yield put(removeInterrupted(url));
		}

		yield put(
			assetDownloadEnd({
				...payload,
				status: "error",
				error,
			}),
		);
	} finally {
		channel.close();
		yield put(clearAssetDownload());
	}
}

/**
 * Downloads run one at a time: the progress state holds a single download.
 */
export function* processAssetDownloadSaga() {
	const downloads: SagaChannel<ProcessAction> = yield actionChannel(
		processAssetDownload.match,
	);

	while (true) {
		const action: ProcessAction = yield take(downloads);
		yield call(worker, action);
	}
}
