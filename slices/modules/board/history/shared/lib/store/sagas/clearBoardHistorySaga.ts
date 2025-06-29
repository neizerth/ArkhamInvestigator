import { setBoardPart } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { clearBoardHistory } from "../actions";

function* worker({ payload }: ReturnType<typeof clearBoardHistory>) {
	const { boardId } = payload;

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

export function* clearBoardHistorySaga() {
	yield takeEvery(clearBoardHistory.match, worker);
}
