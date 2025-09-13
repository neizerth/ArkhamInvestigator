import {
	addChaosTokenInternal,
	createChaosBagToken,
} from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { chaosTokenAdded } from "../addSingleChaosToken";
import { addChaosTokens, chaosTokensAdded } from "./addChaosTokens";

function* worker({ payload }: ReturnType<typeof addChaosTokens>) {
	const tokens = payload.tokens.map((type) => createChaosBagToken({ type }));

	for (const token of tokens) {
		yield put(addChaosTokenInternal(token));
		yield put(
			chaosTokenAdded({
				...payload,
				token,
			}),
		);
	}

	yield put(
		chaosTokensAdded({
			...payload,
			addedTokens: tokens,
		}),
	);
}

export function* addChaosTokensSaga() {
	yield takeEvery(addChaosTokens.match, worker);
}
