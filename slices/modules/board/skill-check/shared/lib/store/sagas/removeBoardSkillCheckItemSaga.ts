import { selectBoardById, setBoardProp } from "@modules/board/base/shared/lib";
import { whereId } from "@shared/lib/util";
import { reject } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { removeBoardSkillCheckItem } from "../actions";
import { selectSkillCheckType } from "../skillCheck";

function* worker({ payload }: ReturnType<typeof removeBoardSkillCheckItem>) {
	const { id, boardId } = payload;

	const boardSelector = selectBoardById(boardId);

	const board: ReturnType<typeof boardSelector> = yield select(boardSelector);
	const type: ReturnType<typeof selectSkillCheckType> =
		yield select(selectSkillCheckType);

	if (!type || !board) {
		return;
	}

	const checkHistory = reject(whereId(id), board.checkHistory);

	yield put(
		setBoardProp({
			...payload,
			prop: "checkHistory",
			value: checkHistory,
		}),
	);
}

export function* removeBoardSkillCheckItemSaga() {
	yield takeEvery(removeBoardSkillCheckItem.match, worker);
}
