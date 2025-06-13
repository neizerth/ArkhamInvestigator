import {
	type ChangeBoardPropPayload,
	addBoardHistoryItem,
	changeBoardProp,
} from "@modules/board/base/shared/lib";
import type { BoardKey } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { supportedInvestigatorBoardProps } from "../../../config";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterHistoryAction = createHistoryActionFilter(changeBoardProp.match);

const filterAction = (action: unknown) => {
	if (!filterHistoryAction(action)) {
		return false;
	}
	return supportedInvestigatorBoardProps.includes(action.payload.prop);
};

function* changeBoardPropHistorySaga<K extends BoardKey>() {
	const action: ChangeBoardPropPayload<K> = yield take(filterAction);
	const { boardId } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.prop]: action.value,
			},
		}),
	);
}

export function* watchChangeBoardPropHistorySaga() {
	yield takeEvery(filterAction, changeBoardPropHistorySaga);
}
