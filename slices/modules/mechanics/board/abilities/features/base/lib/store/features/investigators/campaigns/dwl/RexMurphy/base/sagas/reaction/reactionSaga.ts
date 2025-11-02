import { setBoardAbilityUse } from "@modules/board/abilities/shared/lib";
import {
	increaseBoardActualPropValue,
	selectBoardById,
} from "@modules/board/base/shared/lib";
import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { AbilityCode } from "@modules/mechanics/board/abilities/shared/config";
import { put, select, takeEvery } from "redux-saga/effects";

const filterAction = (action: unknown) => {
	if (!setBoardAbilityUse.match(action)) {
		return false;
	}
	const { abilityId } = action.payload;
	return abilityId === AbilityCode.RexMurphy.base.reaction;
};

function* worker({ payload }: ReturnType<typeof setBoardAbilityUse>) {
	const { boardId, canUse } = payload;

	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { taboo } = board.investigator;

	if (canUse && taboo) {
		return;
	}

	yield put(
		increaseBoardActualPropValue({
			boardId,
			prop: "clues",
			value: 1,
		}),
	);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "clues.get",
			data: {
				count: 1,
			},
		}),
	);
}

export function* BaseRexMurphyReactionSaga() {
	yield takeEvery(filterAction, worker);
}
