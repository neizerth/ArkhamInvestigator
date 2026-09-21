import { END } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/effects";
import {
	clearAssetDownload,
	initAssetDownload,
	setAssetDownloadedSize,
	setAssetSize,
} from "../../shared/lib";
import { type DownloadChannelData, downloadChannel } from "./downloadChannel";
import { assetDownloadEnd, processAssetDownload } from "./processAssetDownload";

type Channel = ReturnType<typeof downloadChannel>;

function* worker({ payload }: ReturnType<typeof processAssetDownload>) {
	yield put(initAssetDownload(payload));

	const channel: Channel = yield call(downloadChannel, payload);
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
					throw new Error(`HTTP ${result.status}`);
				}

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

export function* processAssetDownloadSaga() {
	yield takeEvery(processAssetDownload.match, worker);
}
