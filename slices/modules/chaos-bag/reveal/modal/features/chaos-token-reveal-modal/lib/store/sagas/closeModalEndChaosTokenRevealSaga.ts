import { endChaosBagReveal } from "@modules/chaos-bag/reveal/base/shared/lib";
import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { closeModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker() {
	yield put(
		closeModal({
			id: CustomModalId.chaosTokenReveal,
			source: "effect",
		}),
	);
}

export function* closeModalEndChaosTokenRevealSaga() {
	yield takeEvery(endChaosBagReveal.match, worker);
}
