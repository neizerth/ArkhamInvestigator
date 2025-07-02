import { createChaosBagInternal } from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { chaosBagCreated, createChaosBag } from "../actions";

function* worker({ payload }: ReturnType<typeof createChaosBag>) {
	yield put(createChaosBagInternal(payload));
	yield put(chaosBagCreated(payload));
}
export function* createChaosBagSaga() {
	yield takeEvery(createChaosBag.match, worker);
}
