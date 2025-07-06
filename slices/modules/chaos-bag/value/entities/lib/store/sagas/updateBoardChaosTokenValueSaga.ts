import { selectBoardId } from "@modules/board/base/shared/lib";
import { updateBoardChaosTokenValueInternal } from "@modules/chaos-bag/value/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateBoardChaosTokenValue } from "../actions";

function* worker({ payload }: ReturnType<typeof updateBoardChaosTokenValue>) {
	const boardIdSelector = selectBoardId(payload.boardId);

	const boardId: ReturnType<typeof boardIdSelector> =
		yield select(boardIdSelector);

	if (typeof boardId !== "number") {
		return;
	}

	yield put(
		updateBoardChaosTokenValueInternal({
			...payload,
			boardId,
		}),
	);
}

export function* updateBoardChaosTokenValueSaga() {
	yield takeEvery(updateBoardChaosTokenValue.match, worker);
}
