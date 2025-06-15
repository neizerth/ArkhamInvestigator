import {
	type ChangeBoardPropPayload,
	changeBoardProp,
} from "@modules/board/base/shared/lib";
import type { BoardKey } from "@modules/board/base/shared/model";
import { put, take } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { addBoardHistoryItem } from "../../actions";

const filterHistoryAction = createHistoryActionFilter(changeBoardProp.match);

const filterAction = (action: unknown) => {
	if (!filterHistoryAction(action)) {
		return false;
	}
	return supportedProps.includes(action.payload.prop);
};

export function* watchChangeBoardPropHistorySaga<K extends BoardKey>() {
	const action: ChangeBoardPropPayload<K> = yield take(filterAction);
	const { boardId } = action;

	yield put(
		addBoardHistoryItem({
			boardId,
			data: {
				[action.prop]: action.value,
			},
		}),
	);
}
