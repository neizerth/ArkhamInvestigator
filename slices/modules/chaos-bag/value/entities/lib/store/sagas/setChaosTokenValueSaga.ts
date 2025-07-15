import { selectBoardChaosTokenTypes } from "@modules/chaos-bag/effect/entities/lib";
import { updateChaosTokenValueInternal } from "@modules/chaos-bag/value/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { setChaosTokenValue, updateBoardChaosTokenValue } from "../actions";

function* worker({ payload }: ReturnType<typeof setChaosTokenValue>) {
	const { boardId, type } = payload;

	const tokenSelector = selectBoardChaosTokenTypes(boardId);
	const types: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	const isInvestigatorToken = types.includes(type);

	if (isInvestigatorToken) {
		yield put(updateBoardChaosTokenValue(payload));
		return;
	}

	yield put(updateChaosTokenValueInternal(payload));
}

export function* setChaosTokenValueSaga() {
	yield takeEvery(setChaosTokenValue.match, worker);
}
