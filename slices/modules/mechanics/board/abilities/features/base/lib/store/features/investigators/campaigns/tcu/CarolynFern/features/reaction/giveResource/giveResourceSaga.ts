import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import {
	type boardSelectModalConfirmed,
	createConfirmBoardSelectModalFilter,
} from "@modules/core/modal/entities/board-select/lib";
import { put, takeEvery } from "redux-saga/effects";
import { modalId } from "../config";

const filterAction = createConfirmBoardSelectModalFilter({
	modalId,
});

function* worker({ payload }: ReturnType<typeof boardSelectModalConfirmed>) {
	const boardId = payload.value;

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

export function* CarolynFernGiveResourceSaga() {
	yield takeEvery(filterAction, worker);
}
