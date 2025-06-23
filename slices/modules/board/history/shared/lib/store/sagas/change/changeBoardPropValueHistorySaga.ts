import { boardPropValueChanged } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { changeBoardHistory } from "../../actions";

const filterAction = createHistoryActionFilter(boardPropValueChanged.match);

export function* changeBoardPropValueHistorySaga() {
	const payload: ActionCreatorPayload<typeof boardPropValueChanged> =
		yield take(filterAction);

	yield put(
		changeBoardHistory({
			...payload,
			data: {
				[payload.type]: {
					[payload.prop]: payload.value,
				},
			},
		}),
	);
}
