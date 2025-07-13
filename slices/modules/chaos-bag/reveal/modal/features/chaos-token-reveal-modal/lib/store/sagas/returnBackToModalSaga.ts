import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/entities/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { modalClosed, openModal } from "@modules/core/modal/shared/base/lib";
import { put, select, takeEvery } from "redux-saga/effects";

function* worker() {
	const count: ReturnType<typeof selectRevealedTokensCount> = yield select(
		selectRevealedTokensCount,
	);

	if (count === 0) {
		return;
	}

	yield put(
		openModal({
			id: CustomModalId.chaosTokenReveal,
		}),
	);
}

export function* returnBackToModalSaga() {
	yield takeEvery(modalClosed.match, worker);
}
