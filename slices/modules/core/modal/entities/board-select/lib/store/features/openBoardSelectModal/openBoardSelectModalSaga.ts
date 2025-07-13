import { openModal } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { openBoardSelectModal } from "./openBoardSelectModal";

function* worker({ payload }: ReturnType<typeof openBoardSelectModal>) {
	yield put(
		openModal({
			...payload,
			type: "board-select",
		}),
	);
}

export function* openBoardSelectModalSaga() {
	yield takeEvery(openBoardSelectModal.match, worker);
}
