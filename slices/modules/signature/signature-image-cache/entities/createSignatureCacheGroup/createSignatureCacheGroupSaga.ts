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
		yield put(
			createSignatureCache({
				...payload,
				grayscale: true,
			}),
		);

		const action: ReturnType<typeof signatureCacheCreated> = yield take(
			signatureCacheCreated.match,
		);

		grayscale = action.payload.uri;
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
