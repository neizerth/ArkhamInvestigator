import {
	endChaosBagRevealInternal,
	selectChaosBagReveal,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosBagRevealEnd, endChaosBagReveal } from "./endChaosBagReveal";

function* worker() {
	const state: ReturnType<typeof selectChaosBagReveal> =
		yield select(selectChaosBagReveal);

	yield put(endChaosBagRevealInternal());

	yield put(chaosBagRevealEnd(state));
}

export function* endChaosBagRevealSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
