import {
	type ChangeBoardPropValuePayload,
	addBoardHistoryItem,
	changeBoardPropValue,
} from "@modules/board/base/shared/lib";
import type { InvestigatorBoardStat as Key } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterAction = createHistoryActionFilter(changeBoardPropValue.match);

function* changeBoardPropValueHistorySaga<K extends Key>() {
	const action: ChangeBoardPropValuePayload<K> = yield take(filterAction);
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

export function* watchChangeBoardPropValueHistorySaga() {
	yield takeEvery(filterAction, changeBoardPropValueHistorySaga);
}
