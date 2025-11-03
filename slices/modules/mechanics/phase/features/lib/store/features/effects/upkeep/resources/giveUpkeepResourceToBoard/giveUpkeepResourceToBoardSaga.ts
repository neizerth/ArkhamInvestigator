import { getResources } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { giveUpkeepResourceToBoard } from "./giveUpkeepResourceToBoard";

function* worker({ payload }: ReturnType<typeof giveUpkeepResourceToBoard>) {
	const { boardId } = payload;
	const boardSelector = selectBoardById(boardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	const { baseValue } = board;
	const { upkeepResourcesIncrease } = baseValue;

	if (!upkeepResourcesIncrease) {
		return;
	}

	yield put(
		getResources({
			boardId,
			value: upkeepResourcesIncrease,
		}),
	);
}

export function* giveUpkeepResourceToBoardSaga() {
	yield takeEvery(giveUpkeepResourceToBoard.match, worker);
}
