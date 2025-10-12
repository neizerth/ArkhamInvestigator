import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { fail, failProcessed } from "./fail";

function* worker({ payload }: ReturnType<typeof fail>) {
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

	yield put(failProcessed(payload));
}

export function* StellaClarkFailSaga() {
	yield takeEvery(fail.match, worker);
}
