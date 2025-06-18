import type { ActionCreatorPayload } from "@shared/model";
import { put, take } from "redux-saga/effects";
import { changeBoardPropValue } from "../actions";
import { setBoardPropValueInternal } from "../board";

export function* watchChangeBoardPropValueSaga() {
	const action: ActionCreatorPayload<typeof changeBoardPropValue> = yield take(
		changeBoardPropValue.match,
	);

	yield put(setBoardPropValueInternal(action));
}
