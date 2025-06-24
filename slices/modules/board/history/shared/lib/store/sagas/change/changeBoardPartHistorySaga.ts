import { boardPartChanged } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { pick } from "ramda";
import { put, take } from "redux-saga/effects";
import { supportedInvestigatorBoardHistoryProps as supportedProps } from "../../../../config";
import { changeBoardHistory } from "../../actions";
import { createHistoryActionFilter } from "../../createHistoryActionFilter";

const filterAction = createHistoryActionFilter(boardPartChanged.match);

export function* changeBoardPartHistorySaga() {
	const payload: ActionCreatorPayload<typeof boardPartChanged> =
		yield take(filterAction);

	const data = pick(supportedProps, payload.data);

	yield put(
		changeBoardHistory({
			...payload,
			data,
		}),
	);
}
