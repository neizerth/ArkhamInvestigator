import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { Platform } from "react-native";
import { END, type Channel as SagaChannel } from "redux-saga";
import { actionChannel, call, put, select, take } from "redux-saga/effects";
import {
	addInterruptedUrl,
	clearAssetDownload,
	initAssetDownload,
	removeInterruptedUrl,
	selectInterruptedUrls,
	setAssetDownloadedSize,
	setAssetSize,
} from "../../shared/lib";
import { type DownloadChannelData, downloadChannel } from "./downloadChannel";
import { assetDownloadEnd, processAssetDownload } from "./processAssetDownload";

type Channel = ReturnType<typeof downloadChannel>;
type ProcessAction = ReturnType<typeof processAssetDownload>;

// on Android `resumeData` is the size of the partial file, it is sent as a `Range` header.
// On iOS it is an opaque blob available only after a pause, so downloads start over there.
const canResume = Platform.OS === "android";

class HttpError extends Error {}

const getFilePath = (diskPath: string) =>
	FileSystem.documentDirectory + diskPath;

function* getResumeData(url: string, diskPath: string) {
	if (!canResume) {
		return;
	}

	const interruptedUrls: ReturnType<typeof selectInterruptedUrls> =
		yield select(selectInterruptedUrls);

	if (!interruptedUrls.includes(url)) {
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

function* worker({ payload }: ProcessAction) {
	const { url, diskPath } = payload;

	yield put(initAssetDownload(payload));

	const resumeData: string | undefined = yield call(
		getResumeData,
		url,
		diskPath,
	);

	const channel: Channel = yield call(downloadChannel, {
		...payload,
		resumeData,
	});
	let first = true;
	try {
		while (true) {
			const item: DownloadChannelData | typeof END = yield take(channel);

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

				yield put(removeInterruptedUrl(url));
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
			yield put(removeInterruptedUrl(url));
			yield call(FileSystem.deleteAsync, getFilePath(diskPath), {
				idempotent: true,
			});
		} else if (canResume) {
			yield put(addInterruptedUrl(url));
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
