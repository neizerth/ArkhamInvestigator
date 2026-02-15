import { log } from "@shared/config";
import moment from "moment";
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

	if (moment(board.updatedAt).isAfter(moment(payload.data.updatedAt))) {
		log.info(
			"board updatedAt is greater than payload data",
			board.updatedAt,
			payload.data.updatedAt,
		);
		return;
	}

	yield put(
		setBoardInternal({
			data: {
				...payload.data,
				updatedAt: new Date().toISOString(),
			},
			boardId: board.id,
		}),
	);

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
