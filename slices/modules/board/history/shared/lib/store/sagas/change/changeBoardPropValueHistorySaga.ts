import { boardPropValueChanged } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { changeBoardHistory } from "../../actions";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterAction = createHistoryActionFilter(boardPropValueChanged.match);

function* worker({ payload }: ReturnType<typeof boardPropValueChanged>) {
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

export function* changeBoardPropValueHistorySaga() {
	yield takeEvery(filterAction, worker);
}
