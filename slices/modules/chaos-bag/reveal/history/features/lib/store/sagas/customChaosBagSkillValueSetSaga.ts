import { customChaosBagSkillValueSet } from "@modules/chaos-bag/base/entities/lib";
import { saveCurrentRevealHistoryItem } from "@modules/chaos-bag/reveal/history/entities/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof customChaosBagSkillValueSet>) {
	yield put(saveCurrentRevealHistoryItem(payload));
}

export function* customChaosBagSkillValueSetSaga() {
	yield takeEvery(customChaosBagSkillValueSet.match, worker);
}
