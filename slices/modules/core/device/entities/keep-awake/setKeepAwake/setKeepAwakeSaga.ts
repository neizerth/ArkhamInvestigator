import * as KeepAwake from "expo-keep-awake";

import { setKeepAwakeEnabled } from "@modules/core/device/shared/lib";
import { call, put, takeEvery } from "redux-saga/effects";
import { keepAwakeChanged, setKeepAwake } from "./setKeepAwake";

function* worker({ payload }: ReturnType<typeof setKeepAwake>) {
	const available = KeepAwake.isAvailableAsync();
	if (!available) {
		return;
	}

	const action = payload
		? KeepAwake.activateKeepAwakeAsync
		: KeepAwake.deactivateKeepAwake;

	yield call(action);
	yield put(setKeepAwakeEnabled(payload));
	yield put(keepAwakeChanged(payload));
}

export function* setKeepAwakeSaga() {
	yield takeEvery(setKeepAwake.match, worker);
}
