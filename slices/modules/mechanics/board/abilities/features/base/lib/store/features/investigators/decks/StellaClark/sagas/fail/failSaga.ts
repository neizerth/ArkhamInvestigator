import {
	selectIsBoardAbilityUsed,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { increaseBoardActualPropValue } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { fail, failProcessed } from "./fail";

const abilityId = "reaction";

function* worker({ payload }: ReturnType<typeof fail>) {
	const { boardId } = payload;

	const isUsedSelector = selectIsBoardAbilityUsed({
		boardId,
		abilityId,
	});

	const isUsed: ReturnType<typeof isUsedSelector> =
		yield select(isUsedSelector);

	if (isUsed) {
		yield put(failProcessed(payload));
		return;
	}

	yield put(
		setBoardAbilityUse({
			boardId,
			abilityId,
			canUse: false,
		}),
	);

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
