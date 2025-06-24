import { boardPropChanged } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { changeBoardHistory } from "../../actions";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterHistoryAction = createHistoryActionFilter(boardPropChanged.match);

const filterAction = (action: unknown) => {
	if (!filterHistoryAction(action)) {
		return false;
	}
	return supportedProps.includes(action.payload.prop);
};

export function* changeBoardPropHistorySaga() {
	const payload: ActionCreatorPayload<typeof boardPropChanged> =
		yield take(filterAction);

	yield put(
		changeBoardHistory({
			...payload,
			data: {
				[payload.prop]: payload.value,
			},
		}),
	);
}
