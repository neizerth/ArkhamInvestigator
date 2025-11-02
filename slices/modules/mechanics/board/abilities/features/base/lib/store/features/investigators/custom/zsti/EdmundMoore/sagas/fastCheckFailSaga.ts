import {
	type checkBoardAbilityUseFailed,
	createBoardAbilityCheckFilter,
} from "@modules/board/abilities/shared/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = createBoardAbilityCheckFilter({
	abilityId: AbilityCode.EdmundMoore,
	success: false,
});

function* worker({ payload }: ReturnType<typeof checkBoardAbilityUseFailed>) {
	const { boardId } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const available = board.value.resources;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "resources.notEnough",
			type: "error",
			data: {
				count: 2,
				available,
			},
		}),
	);
}

export function* EdmundMooreFastCheckFailSaga() {
	yield takeEvery(filterAction, worker);
}
