import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openConfirm } from "./openConfirm";

function* worker({ payload }: ReturnType<typeof openConfirm>) {
	yield put(
		openModal({
			...payload,
			type: "confirm",
		}),
	);
}

export function* openConfirmSaga() {
	yield takeEvery(openConfirm.match, worker);
}
