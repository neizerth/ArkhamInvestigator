import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import { getSignatureImageLayout } from "@modules/signature/base/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import {
	addSignatureCache,
	selectSignatureCacheByCode,
	updateSignatureCache,
} from "../../shared/lib";
import {
	createSignatureCache,
	signatureCacheCreated,
} from "./createSignatureCache";
import { processImage } from "./processImage";

function* worker({ payload }: ReturnType<typeof createSignatureCache>) {
	const { image, type, grayscale = false, overwrite, view, offset } = payload;
	const code = image.id;

	const cacheSelector = selectSignatureCacheByCode({
		...payload,
		code,
	});

	const cache: ReturnType<typeof cacheSelector> = yield select(cacheSelector);

	if (cache && !overwrite) {
		yield put(
			signatureCacheCreated({
				...payload,
				uri: cache.uri,
			}),
		);
		return;
	}

	const source = getSignatureImageUrl({
		...payload,
		code,
	});

	const layout = getSignatureImageLayout({
		view,
		image,
		offset,
	});

	const params = {
		source,
		image,
		view,
		layout,
	};

	const response: ReturnAwaited<typeof processImage> = yield call(
		processImage,
		params,
	);

	const { crop } = layout;

	const changes = {
		image,
		src: source,
		uri: response.uri,
		offset,
	};

	if (!cache) {
		yield put(
			addSignatureCache({
				...changes,
				id: v4(),
				code,
				type,
				grayscale,
				crop,
			}),
		);

		yield put(
			signatureCacheCreated({
				...payload,
				uri: response.uri,
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
			changes,
		}),
	);

	yield put(
		signatureCacheCreated({
			...payload,
			uri: response.uri,
		}),
	);
}

export function* createSignatureCacheSaga() {
	yield takeEvery(createSignatureCache.match, worker);
}
