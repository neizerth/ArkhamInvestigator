import { setModifyChaosTokens } from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { setShowChaosBagOdds } from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof setShowChaosBagOdds>) {
	if (!payload) {
		return;
	}

	yield put(setModifyChaosTokens(true));
}

export function* syncChaosOddsEnabledAndModifyTokensSaga() {
	yield takeEvery(setShowChaosBagOdds.match, worker);
}
