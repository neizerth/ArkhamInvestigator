import { boardValuePartChanged } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(boardValuePartChanged.match);

export function* changeBoardValuePartHistorySaga() {
	const action: ActionCreatorPayload<typeof boardValuePartChanged> =
		yield take(filterAction);
	const { boardId, board } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.type]: action.value,
			},
			board,
		}),
	);
}
