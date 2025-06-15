import {
	type ChangeBoardValuePartPayload,
	changeBoardValuePart,
} from "@modules/board/base/shared/lib";
import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(changeBoardValuePart.match);

export function* watchChangeBoardValuePartHistorySaga<K extends Key>() {
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
