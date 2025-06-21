import { selectBoardById, setBoardProp } from "@modules/board/base/shared/lib";
import { whereId } from "@shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { reject } from "ramda";
import { put, select, take } from "redux-saga/effects";
import { removeBoardSkillCheckItem } from "../actions";
import { selectSkillCheckType } from "../skillCheck";

export function* removeBoardSkillCheckItemSaga() {
	type Payload = ActionCreatorPayload<typeof removeBoardSkillCheckItem>;

	const payload: Payload = yield take(removeBoardSkillCheckItem.match);
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
