import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { unzip as unzipFile } from "react-native-zip-archive";
import { call, put, takeEvery } from "redux-saga/effects";
import { unzip, unzipComplete } from "./unzip";

const rootDir = FileSystem.documentDirectory;

function* worker({ payload }: ReturnType<typeof unzip>) {
	// const { unlink } = payload;
	const src = rootDir + payload.src;
	const dest = rootDir + payload.dest;

	const path: ReturnAwaited<typeof unzipFile> = yield call(
		unzipFile,
		src,
		dest,
	);

	if (payload.unlink) {
		yield call(FileSystem.deleteAsync, src);
	}

	yield put(
		unzipComplete({
			...payload,
			path,
		}),
	);
}

export function* unzipSaga() {
	yield takeEvery(unzip.match, worker);
}
