import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { selectBoardTokenTypes } from "@modules/chaos-bag/effect/entities/lib";
import { updateChaosTokenValueInternal } from "@modules/chaos-bag/value/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { updateBoardChaosTokenValue } from "../updateBoardChaosTokenValue";
import { updateCurrentRevealedTokenValue } from "../updateCurrentRevealedTokenValue";
import { setChaosTokenValue } from "./setChaosTokenValue";

function* worker({ payload }: ReturnType<typeof setChaosTokenValue>) {
	const { boardId, type, value, id } = payload;

	const tokenSelector = selectBoardTokenTypes(boardId);
	const types: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	const isNumericToken = chaosToken.types.numeric.includes(type);

	if (isNumericToken) {
		if (!id) {
			return;
		}
		yield put(
			updateCurrentRevealedTokenValue({
				id,
				value,
			}),
		);
		return;
	}

	const isBoardToken = type !== "custom" && types.includes(type);

	if (isBoardToken) {
		yield put(updateBoardChaosTokenValue(payload));
		return;
	}

	yield put(updateChaosTokenValueInternal(payload));
}

export function* setChaosTokenValueSaga() {
	yield takeEvery(setChaosTokenValue.match, worker);
}
