import {
	selectSkillCheckResult as selectResult,
	selectSkillCheckSucceedByResult as selectSucceedBy,
} from "@modules/chaos-bag/result/features/lib";
import {
	endChaosBagRevealInternal,
	selectChaosBagReveal,
} from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosBagRevealEnd, endChaosBagReveal } from "./endChaosBagReveal";

function* worker({ payload }: ReturnType<typeof endChaosBagReveal>) {
	const state: ReturnType<typeof selectChaosBagReveal> =
		yield select(selectChaosBagReveal);

	const result: ReturnType<typeof selectResult> = yield select(selectResult);

	const succeedBy: ReturnType<typeof selectSucceedBy> =
		yield select(selectSucceedBy);

	yield put(endChaosBagRevealInternal());

	yield put(
		chaosBagRevealEnd({
			...payload,
			...state,
			result: state.result ?? result,
			succeedBy: state.succeedBy ?? succeedBy,
		}),
	);
}

export function* endChaosBagRevealSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
