import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { changeBoardValuePart } from "../actions/changeBoardValuePart";
import { setBoardValuePartInternal } from "../board";

export function* watchChangeBoardValuePartSaga() {
	const action: ActionCreatorPayload<typeof changeBoardValuePart> = yield take(
		changeBoardValuePart.match,
	);

	yield put(setBoardValuePartInternal(action));
}
