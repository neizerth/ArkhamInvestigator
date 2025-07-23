import { returnAllChaosTokens } from "@modules/chaos-bag/reveal/base/entities/lib";
import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { modalClosed } from "@modules/core/modal/shared/base/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!modalClosed.match(action)) {
		return false;
	}

	const { payload } = action;

	return (
		payload.modalId === CustomModalId.chaosTokenReveal &&
		payload.source !== "effect"
	);
};

function* worker() {
	const revealedCount: ReturnType<typeof selectRevealedTokensCount> =
		yield select(selectRevealedTokensCount);

	if (revealedCount > 0) {
		yield put(returnAllChaosTokens());
	}
}

export function* handleCloseModalSaga() {
	yield takeEvery(filterAction, worker);
}
