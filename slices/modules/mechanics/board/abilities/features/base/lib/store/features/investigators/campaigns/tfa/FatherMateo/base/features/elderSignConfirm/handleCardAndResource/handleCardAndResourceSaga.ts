import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { takeCardAndResourceModalActionId } from "../../../config";
import type { FatherMateoModalAciton } from "../../../model";

const filterAction = createModalActionFilter({
	ids: [takeCardAndResourceModalActionId],
});

function* worker({ payload }: FatherMateoModalAciton) {
	const { boardId } = payload.modalAction.data;

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "resources",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "investigator.getResources",
			data: {
				count: 1,
			},
		}),
	);
}

export function* handleFatherMateoCardAndResourceModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
