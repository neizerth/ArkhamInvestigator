import { chaosTokensRemoved } from "@modules/chaos-bag/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	allChaosTokensReturned,
	endChaosBagReveal,
	singleChaosTokenReturned,
} from "../../entities/lib";
import { selectRevealedTokensCount } from "../../shared/lib";

function* endWorker() {
	yield put(endChaosBagReveal());
}

function* worker() {
	const tokensCount: ReturnType<typeof selectRevealedTokensCount> =
		yield select(selectRevealedTokensCount);

	if (tokensCount > 0) {
		return;
	}

	yield endWorker();
}

export function* endRevealEffectsSaga() {
	// watch return actions
	yield takeEvery(singleChaosTokenReturned.match, worker);
	yield takeEvery(allChaosTokensReturned.match, endWorker);

	// watch remove actions
	yield takeEvery(chaosTokensRemoved.match, worker);
}
