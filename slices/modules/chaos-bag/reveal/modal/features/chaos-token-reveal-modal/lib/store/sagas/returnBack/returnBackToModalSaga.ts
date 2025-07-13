import { CustomModalId } from "@modules/core/modal/entities/base/config";
import { modalClosed } from "@modules/core/modal/shared/base/lib";
import { takeEvery } from "redux-saga/effects";
import { openModalIfPossible } from "./openModalIfPossible";

function* worker({ payload }: ReturnType<typeof modalClosed>) {
	const { modalId } = payload;

	if (modalId === CustomModalId.chaosTokenReveal) {
		return;
	}

	yield openModalIfPossible();
}

export function* returnBackToModalSaga() {
	yield takeEvery(modalClosed.match, worker);
}
