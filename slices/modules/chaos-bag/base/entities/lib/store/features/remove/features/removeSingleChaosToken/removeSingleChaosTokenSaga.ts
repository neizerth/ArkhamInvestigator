import {
	chaosBagUpdated,
	removeChaosTokenInternal,
	selectChaosBagUpdatedAt,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

import {
	removeSingleChaosToken,
	singleChaosTokenRemoved,
} from "./removeSingleChaosToken";

function* worker({ payload }: ReturnType<typeof singleChaosTokenRemoved>) {
	const { token } = payload;

	const lastUpdatedAt: ReturnType<typeof selectChaosBagUpdatedAt> =
		yield select(selectChaosBagUpdatedAt);

	yield put(
		removeChaosTokenInternal({
			id: token.id,
			lastUpdatedAt,
		}),
	);

	yield put(
		singleChaosTokenRemoved({
			...payload,
			token,
		}),
	);
	yield put(chaosBagUpdated(payload));
}

export function* removeSingleChaosTokenSaga() {
	yield takeEvery(removeSingleChaosToken.match, worker);
}
