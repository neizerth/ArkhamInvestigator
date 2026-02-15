import {
	addChaosTokenInternal,
	createChaosBagToken,
	selectChaosBagUpdatedAt,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosTokenAdded } from "../addSingleChaosToken";
import { addChaosTokens, chaosTokensAdded } from "./addChaosTokens";

function* worker({ payload }: ReturnType<typeof addChaosTokens>) {
	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);
	const tokens = payload.tokens.map((type) => createChaosBagToken({ type }));

	for (const token of tokens) {
		yield put(
			addChaosTokenInternal({
				token,
				lastUpdatedAt,
			}),
		);
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
