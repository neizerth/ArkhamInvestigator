import { boardValuePartChanged } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { changeBoardHistory } from "../../actions";
import { createHistoryActionFilter } from "../../util/createHistoryActionFilter";

const filterAction = createHistoryActionFilter(boardValuePartChanged.match);

function* worker({ payload }: ReturnType<typeof boardValuePartChanged>) {
	yield put(
		changeBoardHistory({
			...payload,
			data: {
				[payload.type]: payload.value,
			},
		}),
	);
}

export function* changeBoardValuePartHistorySaga() {
	yield takeEvery(filterAction, worker);
}
