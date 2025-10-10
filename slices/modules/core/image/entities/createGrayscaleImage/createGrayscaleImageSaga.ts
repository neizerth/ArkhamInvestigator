import { getFileBase64Contents } from "@modules/core/disk/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { call, put, takeEvery } from "redux-saga/effects";
import { getBase64Grayscale } from "../../shared/lib";
import {
	createGrayscaleImage,
	grayscaleImageCreated,
} from "./createGrayscaleImage";

function* worker({ payload }: ReturnType<typeof createGrayscaleImage>) {
	const { source, path } = payload;

	const contents: ReturnAwaited<typeof getFileBase64Contents> = yield call(
		getFileBase64Contents,
		source,
	);

	try {
		const grayscaleContents: ReturnAwaited<typeof getBase64Grayscale> =
			yield call(getBase64Grayscale, contents);

		yield call(FileSystem.writeAsStringAsync, path, grayscaleContents, {
			encoding: FileSystem.EncodingType.Base64,
		});
	} catch (e) {
		console.error("Error getting grayscale contents", e);
	}

	yield put(grayscaleImageCreated(payload));
}

export function* createGrayscaleImageSaga() {
	yield takeEvery(createGrayscaleImage.match, worker);
}
