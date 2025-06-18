import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { changeBoardPart } from "../actions";
import { setBoardPartInternal } from "../board";

export function* watchChangeBoardPartSaga() {
	const payload: ActionCreatorPayload<typeof changeBoardPart> = yield take(
		changeBoardPart.match,
	);
	yield put(setBoardPartInternal(payload));
}
