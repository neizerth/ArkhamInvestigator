import { selectInvestigatorBoards } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { turnEnd } from "../turnEnd";
import { endTurnToAllBoards } from "./endTurnToAllBoards";

function* worker({ payload }: ReturnType<typeof endTurnToAllBoards>) {
	const boards: ReturnType<typeof selectInvestigatorBoards> = yield select(
		selectInvestigatorBoards,
	);

	for (const board of boards) {
		yield put(turnEnd({ boardId: board.id }));
	}
}

export function* endTurnToAllBoardsSaga() {
	yield takeEvery(endTurnToAllBoards.match, worker);
}
