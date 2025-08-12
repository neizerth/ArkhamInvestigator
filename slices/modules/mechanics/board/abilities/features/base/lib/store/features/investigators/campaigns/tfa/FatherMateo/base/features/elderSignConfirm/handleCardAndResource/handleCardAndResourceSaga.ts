import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { takeCardAndResourceModalActionId } from "../../../config";

const filterAction = createModalActionFilter({
	ids: [takeCardAndResourceModalActionId],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

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
