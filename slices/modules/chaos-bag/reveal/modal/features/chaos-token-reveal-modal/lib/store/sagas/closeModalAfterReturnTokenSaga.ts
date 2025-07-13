import {
	allChaosTokensReturned,
	selectRevealedTokensCount,
	singleChaosTokenReturned,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { closeModal } from "@modules/core/modal/shared/base/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const tokensCount: ReturnType<typeof selectRevealedTokensCount> =
		yield select(selectRevealedTokensCount);

	if (tokensCount > 0) {
		return;
	}

	yield put(
		closeModal({
			id: CustomModalId.chaosTokenReveal,
			source: "effect",
		}),
	);
}

export function* closeModalAfterReturnTokenSaga() {
	yield takeEvery(singleChaosTokenReturned.match, worker);
	yield takeEvery(allChaosTokensReturned.match, worker);
}
