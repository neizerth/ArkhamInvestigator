import {
	selectBoardAbilityById,
	setBoardAbilityUse,
} from "@modules/board/abilities/shared/lib";
import { selectCurrentBoard } from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { addWild } from "./addWild";

function* worker({ payload }: ReturnType<typeof addWild>) {
	const { targetBoardId, abilityId, boardId } = payload;

	const abiliySelector = selectBoardAbilityById({
		abilityId,
		boardId,
	});

	const ability: ReturnType<typeof abiliySelector> =
		yield select(abiliySelector);

	if (!ability) {
		return;
	}

	const board: ReturnType<typeof selectCurrentBoard> =
		yield select(selectCurrentBoard);

	yield put(
		setBoardAbilityUse({
			abilityId,
			boardId,
			abilityTargetBoardId: targetBoardId,
			use: false,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId: targetBoardId,
			message: "wild.give",
			data: {
				fromName: board.investigator.name,
				count: 1,
			},
		}),
	);
}

export function* addWildSaga() {
	yield takeEvery(addWild.match, worker);
}
