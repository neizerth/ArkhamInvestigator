import type { InvestigatorBoardStat as Key } from "@modules/board/base/shared/model";
import { put, take } from "redux-saga/effects";
import {
	type ChangeBoardPropValuePayload,
	changeBoardPropValue,
} from "../actions";
import { setBoardPropValueInternal } from "../board";

export function* watchChangeBoardPropValueSaga<K extends Key>() {
	const action: ChangeBoardPropValuePayload<K> = yield take(
		changeBoardPropValue.match,
	);

	yield put(setBoardPropValueInternal(action));
}
