import type { BoardKey } from "@modules/board/base/shared/model";
import { put, take } from "redux-saga/effects";
import { type ChangeBoardPropPayload, changeBoardProp } from "../actions";
import { setBoardPropInternal } from "../board";

export function* watchChangeBoardPropSaga<K extends BoardKey>() {
	const action: ChangeBoardPropPayload<K> = yield take(changeBoardProp.match);

	yield put(setBoardPropInternal(action));
}
