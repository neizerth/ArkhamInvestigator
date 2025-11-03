import { TURN_ABILITY_LIMITS } from "@modules/board/abilities/shared/config";
import {
	resetBoardAbilities,
	selectHasAdditionalAction,
	setAdditionalActionUse,
} from "@modules/board/abilities/shared/lib";
import {
	isBoardExists,
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { newTurnStarted, startNewTurn } from "./startNewTurn";

function* worker({ payload }: ReturnType<typeof startNewTurn>) {
	const { boardId } = payload;

	const selectBoard = selectBoardById(boardId);
	const selectAdditionalAction = selectHasAdditionalAction(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	const { baseValue } = board;
	const additionalAction: ReturnType<typeof selectAdditionalAction> =
		yield select(selectAdditionalAction);

	const historyGroup = createBoardHistoryGroup();

	yield put(
		resetBoardAbilities({
			boardId,
			limitTypes: TURN_ABILITY_LIMITS,
			history: historyGroup,
		}),
	);

	if (additionalAction) {
		yield put(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: baseValue.actions,
				history: historyGroup,
			}),
		);

		yield put(
			setAdditionalActionUse({
				canUse: true,
				boardId,
				history: historyGroup,
			}),
		);
	} else {
		yield put(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: baseValue.actions,
				history: historyGroup,
			}),
		);
	}

	yield put(newTurnStarted(payload));
}

export function* startNewTurnSaga() {
	yield takeEvery(startNewTurn.match, worker);
}
