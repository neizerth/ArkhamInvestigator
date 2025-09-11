import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { createModalActionFilter } from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { makeAdditionalActionModalActionId } from "../../../config";
import type { FatherMateoModalAciton } from "../../../model";

const filterAction = createModalActionFilter({
	ids: [makeAdditionalActionModalActionId],
});

function* worker({ payload }: FatherMateoModalAciton) {
	const { boardId } = payload.modalAction.data;

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "actions",
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "actions.get",
			data: {
				count: 1,
			},
		}),
	);
}

export function* handleFatherMateoAdditionalActionModalActionSaga() {
	yield takeEvery(filterAction, worker);
}
