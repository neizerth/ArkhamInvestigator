import { changeBoardValuePart } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(changeBoardValuePart.match);

export function* watchChangeBoardValuePartHistorySaga() {
	const action: ActionCreatorPayload<typeof changeBoardValuePart> =
		yield take(filterAction);
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
