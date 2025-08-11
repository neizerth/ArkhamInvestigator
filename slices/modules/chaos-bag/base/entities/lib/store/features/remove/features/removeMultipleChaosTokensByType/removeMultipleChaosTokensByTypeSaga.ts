import {
	chaosBagUpdated,
	selectChaosBagTokensByType,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { removeSingleChaosToken } from "../removeSingleChaosToken";
import {
	multipleChaosTokensRemovedByType,
	removeMultipleChaosTokensByType,
} from "./removeMultipleChaosTokensByType";

function* worker({
	payload,
}: ReturnType<typeof removeMultipleChaosTokensByType>) {
	const { type, boardId, count } = payload;

	const tokenSelector = selectChaosBagTokensByType(type);

	const allTokens: ReturnType<typeof tokenSelector> =
		yield select(tokenSelector);

	const tokens = allTokens.slice(0, count);

	for (const token of tokens) {
		yield put(
			removeSingleChaosToken({
				boardId,
				token,
			}),
		);
	}

	yield put(multipleChaosTokensRemovedByType(payload));

	yield put(chaosBagUpdated(payload));
}

export function* removeMultipleChaosTokensByTypeSaga() {
	yield takeEvery(removeMultipleChaosTokensByType.match, worker);
}
