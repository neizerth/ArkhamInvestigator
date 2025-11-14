import {
	chaosBagUpdated,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagTokenData } from "@modules/chaos-bag/base/shared/model";
import { put, select, take, takeEvery } from "redux-saga/effects";
import { chaosTokenUpdated, updateChaosToken } from "../../update";
import { chaosTokenUnsealed, unsealChaosToken } from "./unsealChaosToken";

function* worker({ payload }: ReturnType<typeof unsealChaosToken>) {
	const { id } = payload;
	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const data: ChaosBagTokenData = {
		...token,
		sealData: null,
		sealed: false,
	};

	const updatePayload = {
		id: token.id,
		data,
	};

	yield put(updateChaosToken(updatePayload));
	yield take(chaosTokenUpdated.match);

	yield put(chaosTokenUnsealed(payload));
	yield put(chaosBagUpdated(payload));
}

export function* unsealChaosTokenSaga() {
	yield takeEvery(unsealChaosToken.match, worker);
}
