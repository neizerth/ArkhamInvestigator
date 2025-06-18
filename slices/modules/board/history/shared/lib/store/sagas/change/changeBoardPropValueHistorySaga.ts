import { changeBoardPropValue } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(changeBoardPropValue.match);

export function* watchChangeBoardPropValueHistorySaga() {
	const action: ActionCreatorPayload<typeof changeBoardPropValue> =
		yield take(filterAction);
	const { boardId } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.type]: {
					[action.prop]: action.value,
				},
			},
		}),
	);
}
