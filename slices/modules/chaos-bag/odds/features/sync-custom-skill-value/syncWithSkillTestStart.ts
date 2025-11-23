import { startChaosBagReveal } from "@modules/chaos-bag/reveal/base/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setCustomSkillValue } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof startChaosBagReveal>) {
	const { value = 0 } = payload;

	yield put(setCustomSkillValue(value));
}

export function* syncWithSkillTestStart() {
	yield takeEvery(startChaosBagReveal.match, worker);
}
