import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { changeBoardProp } from "../actions";
import { setBoardPropInternal } from "../board";

export function* watchChangeBoardPropSaga() {
	const action: ActionCreatorPayload<typeof changeBoardProp> = yield take(
		changeBoardProp.match,
	);

	yield put(setBoardPropInternal(action));
}
