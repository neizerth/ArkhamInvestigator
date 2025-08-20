import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { healHorror } from "./healHorror";

function* worker({ payload }: ReturnType<typeof healHorror>) {
	const { targetBoardId, boardId } = payload;

	const boardSelector = selectBoardById(targetBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.value.sanity >= board.baseValue.sanity) {
		return;
	}

	yield put(
		increaseBoardActualPropValue({
			boardId: targetBoardId,
			prop: "sanity",
		}),
	);

	const healSelf = targetBoardId === boardId;

	yield put(
		sendInvestigatorNotification({
			boardId: targetBoardId,
			...(healSelf
				? {}
				: {
						sourceBoardId: boardId,
					}),
			message: healSelf ? "heal.horror.self" : "heal.horror",
			data: {
				fromName: board.investigator.name,
				count: 1,
			},
		}),
	);
}

export function* CarolynFernHealHorrorAbilitySaga() {
	yield takeEvery(healHorror.match, worker);
}
