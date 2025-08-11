import {
	chaosBagUpdated,
	removeChaosTokenInternal,
} from "@modules/chaos-bag/base/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

import {
	removeSingleChaosToken,
	singleChaosTokenRemoved,
} from "./removeSingleChaosToken";

function* worker({ payload }: ReturnType<typeof singleChaosTokenRemoved>) {
	const { token } = payload;

	yield put(
		removeChaosTokenInternal({
			id: token.id,
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
