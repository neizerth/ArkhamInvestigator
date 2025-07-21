import { updateChaosTokenInternal } from "@modules/chaos-bag/base/shared/lib";
import { put, select, takeEvery } from "redux-saga/effects";
import { chaosTokenUpdated, updateChaosToken } from "../../features";
import { selectChaosBagTokenById } from "../../selectors";

function* worker({ payload }: ReturnType<typeof updateChaosToken>) {
	const { id } = payload;

	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	yield put(updateChaosTokenInternal(payload));
	yield put(chaosTokenUpdated(payload));
}

export function* updateChaosTokenSaga() {
	yield takeEvery(updateChaosToken.match, worker);
}
