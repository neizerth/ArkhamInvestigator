import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	createModalActionFilter,
	type modalActionProcessed,
} from "@modules/core/modal/shared/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { makeAdditionalActionModalActionId } from "../../../config";

const filterAction = createModalActionFilter({
	ids: [makeAdditionalActionModalActionId],
});

function* worker({ payload }: ReturnType<typeof modalActionProcessed>) {
	const { boardId } = payload;

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
