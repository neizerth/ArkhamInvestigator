import { Platform } from "react-native";
import { put, takeEvery } from "redux-saga/effects";
import { createSignatureCache } from "../createSignatureCache/createSignatureCache";
import {
	createSignatureCacheGroup,
	signatureCacheGroupCreated,
} from "./createSignatureCacheGroup";

const processGrayscale = Platform.OS === "ios";

function* worker({ payload }: ReturnType<typeof createSignatureCacheGroup>) {
	yield put(createSignatureCache(payload));
	if (processGrayscale) {
		yield put(
			createSignatureCache({
				...payload,
				grayscale: true,
			}),
		);
	}
	yield put(signatureCacheGroupCreated(payload));
}

export function* createSignatureCacheGroupSaga() {
	yield takeEvery(createSignatureCacheGroup.match, worker);
}
