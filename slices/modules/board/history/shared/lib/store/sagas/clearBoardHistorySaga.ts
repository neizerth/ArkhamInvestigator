import { setBoardPart } from "@modules/board/base/shared/lib";
import { put, take } from "redux-saga/effects";
import { type ClearBoardHistoryPayload, clearBoardHistory } from "../actions";

export function* watchClearBoardHistorySaga() {
	const { boardId }: ClearBoardHistoryPayload = yield take(
		clearBoardHistory.match,
	);

	yield put(
		setBoardPart({
			boardId,
			data: {
				history: [],
				historyIndex: -1,
			},
		}),
	);
}
