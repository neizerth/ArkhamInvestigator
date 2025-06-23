import { selectBoardById, setBoardPart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { propEq } from "ramda";
import { put, select, take } from "redux-saga/effects";
import { v4 } from "uuid";
import { replaceBoardHistoryItem } from "../../actions";

export function* replaceBoardHistoryItemSaga() {
	const payload: ActionCreatorPayload<typeof replaceBoardHistoryItem> =
		yield take(replaceBoardHistoryItem.match);
	const { boardId, data, id } = payload;
	const selector = selectBoardById(boardId);
	const board: ReturnType<typeof selector> = yield select(selector);

	if (!board) {
		return;
	}

	const index = board.history.findIndex(propEq(id, "id"));

	if (index === -1) {
		return;
	}

	const item = {
		id: v4(),
		...data,
	};

	const history = board.history.with(index, item);

	yield put(
		setBoardPart({
			boardId,
			data: {
				history,
			},
			history: false,
		}),
	);
}
