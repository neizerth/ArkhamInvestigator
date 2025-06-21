import { setBoardPart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { clearBoardHistory } from "../actions";

export function* clearBoardHistorySaga() {
	const { boardId }: ActionCreatorPayload<typeof clearBoardHistory> =
		yield take(clearBoardHistory.match);

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
