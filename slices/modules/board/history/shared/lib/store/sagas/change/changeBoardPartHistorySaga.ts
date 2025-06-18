import { changeBoardPart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { pick } from "ramda";
import { put, take } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(changeBoardPart.match);

export function* watchChangeBoardPartHistorySaga() {
	const payload: ActionCreatorPayload<typeof changeBoardPart> =
		yield take(filterAction);
	const { boardId } = payload;

	const data = pick(supportedProps, payload.data);

	yield put(
		addBoardHistoryItem({
			boardId,
			data,
		}),
	);
}
