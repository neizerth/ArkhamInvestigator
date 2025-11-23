import type { customChaosBagSkillValueSet } from "@modules/chaos-bag/base/entities/lib";
import { setChaosBagSkillValue } from "@modules/chaos-bag/reveal/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setCustomSkillValue } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof customChaosBagSkillValueSet>) {
	const { value } = payload;

	yield put(setCustomSkillValue(value));
}

export function* syncWithChaosBagSaga() {
	yield takeEvery(setChaosBagSkillValue.match, worker);
}
