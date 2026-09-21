import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { unzip as unzipFile } from "react-native-zip-archive";
import { call, put, takeEvery } from "redux-saga/effects";
import { unzip, unzipComplete, unzipError } from "./unzip";

const rootDir = FileSystem.documentDirectory;

function* worker({ payload }: ReturnType<typeof unzip>) {
	// const { unlink } = payload;
	const src = rootDir + payload.src;
	const dest = rootDir + payload.dest;

	try {
		console.log("unzipping file", src);

		const fileInfo: ReturnAwaited<typeof FileSystem.getInfoAsync> = yield call(
			FileSystem.getInfoAsync,
			src,
		);

		const { exists } = fileInfo;

		if (!exists) {
			throw new Error(`File not exists: ${src}`);
		}

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
	} catch (e) {
		console.error(e);
		yield put(
			unzipError({
				...payload,
				error: e instanceof Error ? e.message : String(e),
			}),
		);
	}
}

export function* unzipSaga() {
	yield takeEvery(unzip.match, worker);
}
