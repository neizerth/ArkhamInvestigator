import { selectChaosBagTokensByType } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { selectCanRemoveMultipleChaosTokensFromBag } from "../../../selectors";
import { removeChaosToken } from "../removeChaosToken";
import {
	cantRemoveMultipleChaosTokensByType,
	multipleChaosTokensRemovedByType,
	removeMultipleChaosTokensByType,
} from "./removeMultipleChaosTokensByType";

function* worker({
	payload,
}: ReturnType<typeof removeMultipleChaosTokensByType>) {
	const { type, boardId, count } = payload;

	const canRemoveSelector = selectCanRemoveMultipleChaosTokensFromBag({
		type,
		count,
	});

	const validation: ReturnType<typeof canRemoveSelector> =
		yield select(canRemoveSelector);

	if (!validation.canRemove) {
		yield put(
			cantRemoveMultipleChaosTokensByType({
				...payload,
				...validation,
			}),
		);
		return;
	}

	const tokenSelector = selectChaosBagTokensByType(type);

	const allTokens: ReturnType<typeof tokenSelector> =
		yield select(tokenSelector);

	const tokens = allTokens.slice(0, count);

	for (const token of tokens) {
		yield put(
			removeChaosToken({
				boardId,
				id: token.id,
			}),
		);
	}

	yield put(multipleChaosTokensRemovedByType(payload));
}

export function* removeMultipleChaosTokensByTypeSaga() {
	yield takeEvery(removeMultipleChaosTokensByType.match, worker);
}
