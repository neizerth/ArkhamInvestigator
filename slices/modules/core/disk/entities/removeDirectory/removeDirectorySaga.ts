import type { ReturnAwaited } from "@shared/model";
import * as FileSystem from "expo-file-system";
import { call } from "ramda";
import { takeEvery } from "redux-saga/effects";
import { removeDirectory } from "./removeDirectory";

function* worker({ payload }: ReturnType<typeof removeDirectory>) {
	const { directory } = payload;
	const info: ReturnAwaited<typeof FileSystem.getInfoAsync> = yield call(
		FileSystem.getInfoAsync,
		directory,
	);

	if (info.exists) {
		yield call(FileSystem.deleteAsync, directory);
	}
}

export function* removeDirectorySaga() {
	yield takeEvery(removeDirectory.match, worker);
}
