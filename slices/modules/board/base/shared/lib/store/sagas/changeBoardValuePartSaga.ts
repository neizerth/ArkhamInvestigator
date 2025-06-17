import type { InvestigatorBoardValueProp as Key } from "@modules/board/base/shared/model";
import { put, take } from "redux-saga/effects";
import type { ChangeBoardValuePartPayload } from "../actions";
import { changeBoardValuePart } from "../actions/changeBoardValuePart";
import { setBoardValuePartInternal } from "../board";

export function* watchChangeBoardValuePartSaga<K extends Key>() {
	const action: ChangeBoardValuePartPayload<K> = yield take(
		changeBoardValuePart.match,
	);

	yield put(setBoardValuePartInternal(action));
}
