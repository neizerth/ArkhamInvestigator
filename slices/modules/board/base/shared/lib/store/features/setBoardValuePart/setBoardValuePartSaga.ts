import { put, select, takeEvery } from "redux-saga/effects";
import { isBoardExists } from "../../../fallback";
import { setBoardValuePartInternal } from "../../board";
import { selectBoardById } from "../../selectors";
import { boardValuePartChanged, setBoardValuePart } from "./setBoardValuePart";

function* worker({ payload }: ReturnType<typeof setBoardValuePart>) {
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	yield put(setBoardValuePartInternal(payload));

	yield put(
		boardValuePartChanged({
			...payload,
			board,
		}),
	);
}

export function* setBoardValuePartSaga() {
	yield takeEvery(setBoardValuePart.match, worker);
}
