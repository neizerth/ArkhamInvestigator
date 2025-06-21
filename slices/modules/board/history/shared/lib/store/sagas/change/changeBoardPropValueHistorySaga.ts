import { boardPropValueChanged } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(boardPropValueChanged.match);

export function* changeBoardPropValueHistorySaga() {
	const action: ActionCreatorPayload<typeof boardPropValueChanged> =
		yield take(filterAction);
	const { boardId, board } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.type]: {
					[action.prop]: action.value,
				},
			},
			board,
		}),
	);
}
