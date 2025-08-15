import { END } from "redux-saga";
import { call, put, take, takeEvery } from "redux-saga/effects";
import {
	clearAssetDownload,
	initAssetDownload,
	setAssetDownloadedSize,
	setAssetSize,
} from "../../shared/lib";
import {
	type DownloadChannelData,
	createDownloadChannel,
} from "./createDownloadChannel";
import {
	assetSuccessfullyDownloaded,
	processAssetDownload,
} from "./processAssetDownload";

type Channel = ReturnType<typeof createDownloadChannel>;

function* worker({ payload }: ReturnType<typeof processAssetDownload>) {
	yield put(initAssetDownload(payload));

	const channel: Channel = yield call(createDownloadChannel, payload);
	let first = true;
	try {
		while (true) {
			const item: DownloadChannelData | typeof END = yield take(channel);

			if (item.type === END.type) {
				break;
			}
			if (item.type === "result") {
				if (item.value) {
					yield put(
						assetSuccessfullyDownloaded({
							...payload,
							uri: item.value.uri,
						}),
					);
				}

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
		console.error("download error", error);
	} finally {
		yield put(clearAssetDownload());
	}
}

export function* processAssetDownloadSaga() {
	yield takeEvery(processAssetDownload.match, worker);
}
