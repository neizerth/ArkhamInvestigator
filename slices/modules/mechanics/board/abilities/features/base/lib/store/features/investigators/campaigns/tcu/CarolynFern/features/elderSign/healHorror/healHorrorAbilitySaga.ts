import { healHorror } from "@modules/board/base/entities/base/lib";
import { selectBoardById } from "@modules/board/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { healHorror as CarolynFernHealHorror } from "./healHorror";

function* worker({ payload }: ReturnType<typeof CarolynFernHealHorror>) {
	const { targetBoardId, boardId } = payload;

	const boardSelector = selectBoardById(targetBoardId);
	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);

	if (board.value.sanity >= board.baseValue.sanity) {
		return;
	}

	yield put(
		healHorror({
			boardId: targetBoardId,
			sourceBoardId: boardId,
			value: 1,
		}),
	);
}

export function* CarolynFernHealHorrorAbilitySaga() {
	yield takeEvery(CarolynFernHealHorror.match, worker);
}
