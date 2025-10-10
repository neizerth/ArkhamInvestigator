import {
	createGrayscaleImage,
	grayscaleImageCreated,
} from "@modules/core/image/entities/createGrayscaleImage";
import { getSignatureImageUrl } from "@modules/signature/base/shared/api";
import { Platform } from "react-native";
import { put, take, takeEvery } from "redux-saga/effects";
import {
	createSignatureCache,
	signatureCacheCreated,
} from "../createSignatureCache/createSignatureCache";
import {
	createSignatureCacheGroup,
	signatureCacheGroupCreated,
} from "./createSignatureCacheGroup";

const processGrayscale = Platform.OS === "ios";

function* worker({ payload }: ReturnType<typeof createSignatureCacheGroup>) {
	yield put(createSignatureCache(payload));

	const action: ReturnType<typeof signatureCacheCreated> = yield take(
		signatureCacheCreated.match,
	);

	const color = action.payload.uri;

	let grayscale = color;

	if (processGrayscale) {
		const { type } = payload;
		const path = getSignatureImageUrl({
			type,
			code: payload.image.id,
			grayscale: true,
		});

		yield put(
			createGrayscaleImage({
				path,
				source: color,
			}),
		);
		yield take(grayscaleImageCreated.match);

		grayscale = path;
	}

	yield put(
		signatureCacheGroupCreated({
			...payload,
			background: {
				color,
				grayscale,
			},
		}),
	);
}

export function* createSignatureCacheGroupSaga() {
	yield takeEvery(createSignatureCacheGroup.match, worker);
}
