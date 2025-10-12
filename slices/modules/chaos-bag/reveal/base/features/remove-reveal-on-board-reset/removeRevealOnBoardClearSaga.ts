import { selectBoardId } from "@modules/board/base/shared/lib";
import { resetBoard } from "@modules/mechanics/board/base/entities/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import {
	endChaosBagRevealInternal,
	selectChaosBagSkillCheckBoardId,
} from "../../shared/lib";

function* worker({ payload }: ReturnType<typeof resetBoard>) {
	const skillCheckBoardId: ReturnType<typeof selectChaosBagSkillCheckBoardId> =
		yield select(selectChaosBagSkillCheckBoardId);

	const boardIdSelector = selectBoardId(payload.boardId);
	const boardId: ReturnType<typeof boardIdSelector> =
		yield select(boardIdSelector);

	if (skillCheckBoardId !== boardId) {
		return;
	}

	yield put(endChaosBagRevealInternal());
}

export function* removeRevealOnBoardResetSaga() {
	yield takeEvery(resetBoard.match, worker);
}
