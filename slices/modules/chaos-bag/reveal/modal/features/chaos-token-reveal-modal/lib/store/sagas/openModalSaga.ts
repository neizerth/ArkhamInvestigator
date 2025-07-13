import { startChaosBagRevealInternal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(
		openModal({
			id: CustomModalId.chaosTokenReveal,
			closeFromBackButton: false,
		}),
	);
}

export function* openModalSaga() {
	yield takeEvery(startChaosBagRevealInternal.match, worker);
}
