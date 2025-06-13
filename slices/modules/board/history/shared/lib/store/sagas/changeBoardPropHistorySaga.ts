import {
	type ChangeBoardPropPayload,
	addBoardHistoryItem,
	changeBoardProp,
} from "@modules/board/base/shared/lib";
import type { BoardKey } from "@modules/board/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { supportedInvestigatorBoardProps } from "../../../config";

function* changeBoardPropHistorySaga<K extends BoardKey>() {
	const action: ChangeBoardPropPayload<K> = yield take(changeBoardProp.match);
	const { boardId } = action;

	if (!supportedInvestigatorBoardProps.includes(action.prop)) {
		return;
	}

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
	yield takeEvery(changeBoardProp.match, changeBoardPropHistorySaga);
}
