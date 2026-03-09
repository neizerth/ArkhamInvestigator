import {
	setChaosBagEnabled,
	setModifyChaosTokens,
} from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof setChaosBagEnabled>) {
	if (!payload) {
		return;
	}

	yield put(setModifyChaosTokens(true));
}

export function* syncChaosOddsEnabledAndModifyTokensSaga() {
	yield takeEvery(setChaosBagEnabled.match, worker);
}
