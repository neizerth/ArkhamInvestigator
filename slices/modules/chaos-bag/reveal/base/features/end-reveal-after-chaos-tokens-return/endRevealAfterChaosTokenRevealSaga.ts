import { put, select, takeEvery } from "redux-saga/effects";
import {
	allChaosTokensReturned,
	singleChaosTokenReturned,
} from "../../entities/lib";
import { endChaosBagReveal, selectRevealedTokensCount } from "../../shared/lib";

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

export function* endRevealAfterChaosTokenRevealSaga() {
	yield takeEvery(singleChaosTokenReturned.match, worker);
	yield takeEvery(allChaosTokensReturned.match, endWorker);
}
