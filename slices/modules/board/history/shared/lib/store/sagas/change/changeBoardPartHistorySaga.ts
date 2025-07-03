import { boardPartChanged } from "@modules/board/base/shared/lib";
import { pick } from "ramda";
import { put, takeEvery } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { changeBoardHistory } from "../../actions";
import { createHistoryActionFilter } from "../../util/createHistoryActionFilter";

const filterAction = createHistoryActionFilter(boardPartChanged.match);

function* worker({ payload }: ReturnType<typeof boardPartChanged>) {
	const data = pick(supportedProps, payload.data);

	yield put(
		changeBoardHistory({
			...payload,
			data,
		}),
	);
}

export function* changeBoardPartHistorySaga() {
	yield takeEvery(filterAction, worker);
}
