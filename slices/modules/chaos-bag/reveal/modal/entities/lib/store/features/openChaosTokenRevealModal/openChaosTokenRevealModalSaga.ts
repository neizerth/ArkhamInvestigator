import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openChaosTokenRevealModal } from "./openChaosTokenRevealModal";

function* worker({ payload }: ReturnType<typeof openChaosTokenRevealModal>) {
	yield put(
		openModal({
			id: CustomModalId.chaosTokenReveal,
			closeFromBackButton: false,
			fullWindowOverlay: false,
			data: {
				force: payload,
			},
		}),
	);
}

export function* openChaosTokenRevealModalSaga() {
	yield takeEvery(openChaosTokenRevealModal.match, worker);
}
