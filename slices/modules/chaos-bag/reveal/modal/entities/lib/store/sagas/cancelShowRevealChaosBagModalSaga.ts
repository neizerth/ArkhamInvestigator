import { selectRevealedTokensCount } from "@modules/chaos-bag/reveal/base/entities/lib";
import {
	canCancelShowRevealModal,
	setShowRevealModal,
} from "@modules/chaos-bag/reveal/modal/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { cancelShowRevealChaosBagModal } from "../actions";

function* worker() {
	const revealedTokensCount: ReturnType<typeof selectRevealedTokensCount> =
		yield select(selectRevealedTokensCount);

	if (!canCancelShowRevealModal({ revealedTokensCount })) {
		return;
	}

	yield put(setShowRevealModal(false));
}

export function* cancelShowRevealChaosBagModalSaga() {
	yield takeEvery(cancelShowRevealChaosBagModal.match, worker);
}
