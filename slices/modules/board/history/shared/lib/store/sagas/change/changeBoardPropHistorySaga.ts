import { boardPropChanged } from "@modules/board/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { changeBoardHistory } from "../../actions";
import { createHistoryActionFilter } from "../../util/createHistoryActionFilter";

const filterHistoryAction = createHistoryActionFilter(boardPropChanged.match);

const filterAction = (action: unknown) => {
	if (!filterHistoryAction(action)) {
		return false;
	}
	return supportedProps.includes(action.payload.prop);
};

function* worker({ payload }: ReturnType<typeof boardPropChanged>) {
	yield put(
		changeBoardHistory({
			...payload,
			data: {
				[payload.prop]: payload.value,
			},
		}),
	);
}

export function* changeBoardPropHistorySaga() {
	yield takeEvery(filterAction, worker);
}
