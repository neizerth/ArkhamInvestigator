import { selectBoardId } from "@modules/board/base/shared/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { selectIsChaosTokenPersonal } from "@modules/chaos-bag/effect/entities/lib";
import {
	removeBoardChaosTokenValueInternal,
	updateChaosTokenValueInternal,
} from "@modules/chaos-bag/value/shared/lib";
import { has } from "ramda";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectBoardTokenValues } from "../..";
import { updateBoardChaosTokenValue } from "../updateBoardChaosTokenValue";
import { updateCurrentRevealedTokenValue } from "../updateCurrentRevealedTokenValue";
import { setChaosTokenValue } from "./setChaosTokenValue";

function* worker({ payload }: ReturnType<typeof setChaosTokenValue>) {
	const { boardId, type, value, id } = payload;

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

	const personalSelector = selectIsChaosTokenPersonal({ boardId, type });
	const isPersonal: ReturnType<typeof personalSelector> =
		yield select(personalSelector);

	if (isPersonal) {
		yield put(updateBoardChaosTokenValue(payload));
		return;
	}

	const boardValueSelector = selectBoardTokenValues(boardId);
	const boardValue: ReturnType<typeof boardValueSelector> =
		yield select(boardValueSelector);
	const hasBoardValue = has(type, boardValue) as boolean;

	if (hasBoardValue) {
		const boardIdSelector = selectBoardId(payload.boardId);
		const boardId: ReturnType<typeof boardIdSelector> =
			yield select(boardIdSelector);

		yield put(removeBoardChaosTokenValueInternal({ boardId, type }));
	}

	yield put(updateChaosTokenValueInternal(payload));
}

export function* setChaosTokenValueSaga() {
	yield takeEvery(setChaosTokenValue.match, worker);
}
