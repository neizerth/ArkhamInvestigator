import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "@modules/board/base/shared/lib";
import type { InvestigatorBoardStat as Key } from "@modules/board/base/shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterAction = createHistoryActionFilter(changeBoardPropValue.match);

export function* watchChangeBoardPropValueHistorySaga<K extends Key>() {
	const action: ChangeBoardPropValuePayload<K> = yield take(filterAction);
	const { boardId } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.type]: {
					[action.prop]: action.value,
				},
			},
		}),
	);
}
