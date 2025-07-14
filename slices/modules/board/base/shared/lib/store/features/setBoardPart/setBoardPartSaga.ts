import { put, select, takeEvery } from "redux-saga/effects";
import { isBoardExists } from "../../../fallback";
import { setBoardPartInternal } from "../../board";
import { selectBoardById } from "../../selectors";
import { boardPartChanged, setBoardPart } from "./setBoardPart";

function* worker({ payload }: ReturnType<typeof setBoardPart>) {
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	yield put(setBoardPartInternal(payload));

	yield put(
		boardPartChanged({
			...payload,
			board,
		}),
	);
}

export function* setBoardPartSaga() {
	yield takeEvery(setBoardPart.match, worker);
}
