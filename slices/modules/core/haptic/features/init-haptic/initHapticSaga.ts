import { appStarted } from "@modules/core/app/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { call, put, select, takeEvery } from "redux-saga/effects";
import {
	selectHapticEffectsSupported,
	setHapticEffectsSupported,
} from "../../shared/lib";
import { Haptics } from "../../shared/lib/Haptics";

function* worker() {
	const support: ReturnType<typeof selectHapticEffectsSupported> = yield select(
		selectHapticEffectsSupported,
	);

	if (support !== null) {
		return;
	}

	const effectsSupported: ReturnAwaited<typeof Haptics.isEffectsSupported> =
		yield call(Haptics.isEffectsSupported);

	yield put(setHapticEffectsSupported(effectsSupported));
}

export function* initHapticSaga() {
	yield takeEvery(appStarted, worker);
}
