import { put, select, takeEvery } from "redux-saga/effects";
import { isBoardExists } from "../../fallback";
import { boardPropValueChanged, setBoardPropValue } from "../actions";
import { setBoardPropValueInternal } from "../board";
import { selectBoardById } from "../selectors";

function* worker({ payload }: ReturnType<typeof setBoardPropValue>) {
	const { boardId } = payload;
	const selectBoard = selectBoardById(boardId);

	const board: ReturnType<typeof selectBoard> = yield select(selectBoard);

	if (!isBoardExists(board)) {
		return;
	}

	yield put(setBoardPropValueInternal(payload));

	yield put(
		boardPropValueChanged({
			...payload,
			board,
		}),
	);
}

export function* setBoardPropValueSaga() {
	yield takeEvery(setBoardPropValue.match, worker);
}
