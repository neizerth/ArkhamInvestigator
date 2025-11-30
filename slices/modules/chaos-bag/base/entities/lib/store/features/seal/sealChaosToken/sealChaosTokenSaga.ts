import {
	chaosBagUpdated,
	selectChaosBagTokenById,
} from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagTokenData } from "@modules/chaos-bag/base/shared/model";
import { put, select, take, takeEvery } from "redux-saga/effects";
import { chaosTokenUpdated, updateChaosToken } from "../../update";
import { chaosTokenSealed, sealChaosToken } from "./sealChaosToken";

function* worker({ payload }: ReturnType<typeof sealChaosToken>) {
	const { id, sealData } = payload;
	const tokenSelector = selectChaosBagTokenById(id);

	const token: ReturnType<typeof tokenSelector> = yield select(tokenSelector);

	if (!token) {
		return;
	}

	const data: ChaosBagTokenData = {
		...token,
		sealed: true,
		sealData,
	};

	const updatePayload = {
		id: token.id,
		data,
	};

	yield put(updateChaosToken(updatePayload));
	yield take(chaosTokenUpdated.match);

	yield put(chaosTokenSealed(payload));
	yield put(chaosBagUpdated(payload));
}

export function* sealChaosTokenSaga() {
	yield takeEvery(sealChaosToken.match, worker);
}
