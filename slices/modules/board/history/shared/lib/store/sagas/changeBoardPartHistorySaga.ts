import {
	type ChangeBoardPartPayload,
	addBoardHistoryItem,
	changeBoardValuePart,
} from "@modules/board/base/shared/lib";
import { pick } from "ramda";
import { put, take, takeEvery } from "redux-saga/effects";
import { supportedInvestigatorBoardProps } from "../../../config";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterAction = createHistoryActionFilter(changeBoardValuePart.match);

function* changeBoardPartSaga() {
	const payload: ChangeBoardPartPayload = yield take(filterAction);
	const { boardId } = payload;

	const data = pick(supportedInvestigatorBoardProps, payload.data);

	yield put(
		addBoardHistoryItem({
			boardId,
			data,
		}),
	);
}

export function* watchChangeBoardPartHistorySaga() {
	yield takeEvery(filterAction, changeBoardPartSaga);
}
