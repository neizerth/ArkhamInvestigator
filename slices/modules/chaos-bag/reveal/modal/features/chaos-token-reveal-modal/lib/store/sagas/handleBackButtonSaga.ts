import {
	returnAllChaosTokens,
	selectRevealedTokensCount,
} from "@modules/chaos-bag/reveal/base/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { closeModal } from "@modules/core/modal/shared/base/lib";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!closeModal.match(action)) {
		return false;
	}

	return (
		action.payload.source === "backButton" &&
		action.payload.id === CustomModalId.chaosTokenReveal
	);
};

function* worker() {
	const revealedCount: ReturnType<typeof selectRevealedTokensCount> =
		yield select(selectRevealedTokensCount);

	if (revealedCount > 0) {
		yield put(returnAllChaosTokens());
	}

	yield put(
		closeModal({
			source: "effect",
		}),
	);
}

export function* handleBackButtonSaga() {
	yield takeEvery(filterAction, worker);
}
