import { getResources } from "@modules/board/base/entities/base/lib";
import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { takeCardAndResourceModalActionId } from "../../../config";
import type { FatherMateoModalAciton } from "../../../model";

const filterAction = createModalActionFilter({
	ids: [takeCardAndResourceModalActionId],
});

function* worker({ payload }: FatherMateoModalAciton) {
	const { boardId } = payload.modalAction.data;

	yield put(getResources({ boardId }));
}

export function* handleFatherMateoCardAndResourceModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
