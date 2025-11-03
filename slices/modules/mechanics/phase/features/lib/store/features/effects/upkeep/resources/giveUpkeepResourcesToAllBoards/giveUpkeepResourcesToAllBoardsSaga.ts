import { selectBoardIds } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { giveUpkeepResourceToBoard } from "../giveUpkeepResourceToBoard";
import { giveUpkeepResourcesToAllBoards } from "./giveUpkeepResourcesToAllBoards";

function* worker() {
	const boardIds: ReturnType<typeof selectBoardIds> =
		yield select(selectBoardIds);

	for (const boardId of boardIds) {
		yield put(
			giveUpkeepResourceToBoard({
				boardId,
			}),
		);
	}
}

export function* giveUpkeepResourcesToAllBoardsSaga() {
	yield takeEvery(giveUpkeepResourcesToAllBoards.match, worker);
}
