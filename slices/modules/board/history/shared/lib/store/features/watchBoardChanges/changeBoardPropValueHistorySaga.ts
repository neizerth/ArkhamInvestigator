import { boardPropValueChanged } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../util/createHistoryActionFilter";
import { changeBoardHistory } from "../changeBoardHistory";

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
