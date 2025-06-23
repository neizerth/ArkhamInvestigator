import { boardValuePartChanged } from "@modules/board/base/shared/lib";
import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { createHistoryActionFilter } from "../../../createHistoryActionFilter";
import { changeBoardHistory } from "../../actions";

const filterAction = createHistoryActionFilter(boardValuePartChanged.match);

export function* changeBoardValuePartHistorySaga() {
	const payload: ActionCreatorPayload<typeof boardValuePartChanged> =
		yield take(filterAction);

	yield put(
		changeBoardHistory({
			...payload,
			data: {
				[payload.type]: payload.value,
			},
		}),
	);
}
