import {
	type ChangeBoardValuePartPayload,
	addBoardHistoryItem,
	changeBoardValuePart,
} from "@modules/board/base/shared/lib";
import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterAction = createHistoryActionFilter(changeBoardValuePart.match);

function* changeBoardValuePartHistorySaga<K extends Key>() {
	const action: ChangeBoardValuePartPayload<K> = yield take(filterAction);
	const { boardId } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.type]: action.value,
			},
		}),
	);
}

export function* watchChangeBoardValuePartHistorySaga() {
	yield takeEvery(filterAction, changeBoardValuePartHistorySaga);
}
