import { selectSkillCheckResult } from "@modules/chaos-bag/result/features/lib";
import {
	endChaosBagRevealInternal,
	selectChaosBagReveal,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosBagRevealEnd, endChaosBagReveal } from "./endChaosBagReveal";

function* worker() {
	const state: ReturnType<typeof selectChaosBagReveal> =
		yield select(selectChaosBagReveal);

	const result: ReturnType<typeof selectSkillCheckResult> = yield select(
		selectSkillCheckResult,
	);

	yield put(endChaosBagRevealInternal());

	yield put(
		chaosBagRevealEnd({
			...state,
			result: state.result || result,
		}),
	);
}

export function* endChaosBagRevealSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
