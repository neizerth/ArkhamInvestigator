import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openCustomModal } from "./openCustomModal";

function* worker({ payload }: ReturnType<typeof openCustomModal>) {
	yield put(
		openModal({
			...payload,
			type: "custom",
		}),
	);
}

export function* openCustomModalSaga() {
	yield takeEvery(openCustomModal.match, worker);
}
