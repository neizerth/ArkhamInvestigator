import { resetBoardAbilities } from "@modules/board/abilities/shared/lib";
import {
	selectBoardById,
	setBoardActualPropValue,
} from "@modules/board/base/shared/lib";
import { createBoardHistoryGroup } from "@modules/board/history/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { giveUpkeepResourceToBoard } from "../../..";
import { startNewTurn, turnEnd } from "../../../common";
import { makeAction } from "./makeAction";

function* worker({ payload }: ReturnType<typeof makeAction>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { actions } = board.value;

	if (actions > 0) {
		const historyGroup = createBoardHistoryGroup();
		yield put(
			setBoardActualPropValue({
				boardId,
				prop: "actions",
				value: actions - 1,
				history: historyGroup,
			}),
		);

		yield put(
			resetBoardAbilities({
				boardId,
				limitTypes: ["action"],
				history: historyGroup,
			}),
		);
		return;
	}
	yield put(turnEnd({ boardId }));
	yield put(startNewTurn({ boardId }));
	yield put(giveUpkeepResourceToBoard({ boardId }));
}

export function* makeActionSaga() {
	yield takeEvery(makeAction.match, worker);
}
