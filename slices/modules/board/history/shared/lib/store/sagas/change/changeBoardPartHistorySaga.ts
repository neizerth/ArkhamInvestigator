import {
	type ChangeBoardPartPayload,
	changeBoardValuePart,
} from "@modules/board/base/shared/lib";
import { pick } from "ramda";
import { put, take } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(changeBoardValuePart.match);

export function* watchChangeBoardPartHistorySaga() {
	const payload: ChangeBoardPartPayload = yield take(filterAction);
	const { boardId } = payload;

	const data = pick(supportedProps, payload.data);

	yield put(
		addBoardHistoryItem({
			boardId,
			data,
		}),
	);
}
