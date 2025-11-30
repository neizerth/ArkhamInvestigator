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
	setBoardProp,
} from "@modules/board/base/shared/lib";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { v4 } from "uuid";
import { newTurnStarted, startNewTurn } from "./startNewTurn";

function* worker({ payload }: ReturnType<typeof startNewTurn>) {
	const { boardId } = payload;

	const selectBoard = selectBoardById(boardId);
	const selectAdditionalAction = selectHasAdditionalAction(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	const { baseValue, turnId } = board;
	const additionalAction: ReturnType<typeof selectAdditionalAction> =
		yield select(selectAdditionalAction);

	const history = createBoardHistoryGroup();
	const newTurnId = v4();

	yield put(
		setBoardProp({
			boardId,
			prop: "turnId",
			value: newTurnId,
			history,
		}),
	);

	yield put(
		resetBoardAbilities({
			boardId,
			limitTypes: TURN_ABILITY_LIMITS,
			history,
		}),
	);

	if (additionalAction) {
		yield put(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: baseValue.actions,
				history,
			}),
		);

		yield put(
			setAdditionalActionUse({
				canUse: true,
				boardId,
				history,
			}),
		);
	} else {
		yield put(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: baseValue.actions,
				history,
			}),
		);
	}

	yield put(
		newTurnStarted({
			...payload,
			oldTurnId: turnId,
			turnId: newTurnId,
		}),
	);
}

export function* startNewTurnSaga() {
	yield takeEvery(startNewTurn.match, worker);
}
