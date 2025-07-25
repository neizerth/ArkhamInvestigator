import {
	removeChaosTokenInternal,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";

import { chaosTokenRemoved, removeChaosToken } from "./removeChaosToken";

function* worker({ payload }: ReturnType<typeof removeChaosToken>) {
	const { id } = payload;

	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	yield put(
		removeChaosTokenInternal({
			id: token.id,
		}),
	);

	yield put(
		chaosTokenRemoved({
			...payload,
			token,
		}),
	);
}

export function* removeChaosTokenSaga() {
	yield takeEvery(removeChaosToken.match, worker);
}
