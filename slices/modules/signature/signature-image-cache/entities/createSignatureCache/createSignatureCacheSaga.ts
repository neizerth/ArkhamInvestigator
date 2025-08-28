import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import {
	addSignatureCache,
	selectSignatureCacheByCode,
	updateSignatureCache,
} from "../../shared/lib";
import { createSignatureCache } from "./createSignatureCache";
import { processImage } from "./processImage";

function* worker({ payload }: ReturnType<typeof createSignatureCache>) {
	const { image, type, grayscale = false, overwrite } = payload;
	const code = image.id;

	const cacheSelector = selectSignatureCacheByCode({
		...payload,
		code,
	});

	const cache: ReturnType<typeof cacheSelector> = yield select(cacheSelector);

	if (cache && !overwrite) {
		return;
	}

	const result: ReturnAwaited<typeof processImage> = yield call(
		processImage,
		payload,
	);

	if (!cache) {
		yield put(
			addSignatureCache({
				id: v4(),
				code,
				uri: result.uri,
				type,
				grayscale,
			}),
		);
		return;
	}
	const { exists }: ReturnAwaited<typeof FileSystem.getInfoAsync> = yield call(
		FileSystem.getInfoAsync,
		cache.uri,
	);

	if (exists) {
		console.log(`deleting ${cache.uri}`);

		yield call(FileSystem.deleteAsync, cache.uri);
	}

	yield put(
		updateSignatureCache({
			id: cache.id,
			changes: {
				uri: result.uri,
			},
		}),
	);
}

export function* createSignatureCacheSaga() {
	yield takeEvery(createSignatureCache.match, worker);
}
