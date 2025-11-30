import { put, select, takeEvery } from "redux-saga/effects";
import { isBoardExists } from "../../../fallback";
import { boardChanged } from "../../actions";
import { setBoardInternal } from "../../board";
import { selectBoardById } from "../../selectors";
import { boardSet, setBoard } from "./setBoard";
function* worker({ payload }: ReturnType<typeof setBoard>) {
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	yield put(setBoardInternal(payload));

	yield put(
		boardSet({
			...payload,
			board,
		}),
	);
	yield put(boardChanged(payload));
}

export function* setBoardSaga() {
	yield takeEvery(setBoard.match, worker);
}
