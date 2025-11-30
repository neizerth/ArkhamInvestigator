import { chaosBagUpdated } from "@modules/chaos-bag/base/shared/lib";
import type { ChaosBagTokenData } from "@modules/chaos-bag/base/shared/model";
import { put, take, takeEvery } from "redux-saga/effects";
import { chaosTokenUpdated, updateChaosToken } from "../../../../update";
import { chaosTokenUnsealed } from "../../unsealChaosToken";
import { unsealToken } from "./unsealToken";

function* worker({ payload }: ReturnType<typeof unsealToken>) {
	const { token, boardId } = payload;
	if (!token) {
		console.error("Token not found");
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

	yield put(
		chaosTokenUnsealed({
			id: token.id,
			boardId,
		}),
	);
	yield put(chaosBagUpdated(payload));
}

export function* unsealTokenSaga() {
	yield takeEvery(unsealToken.match, worker);
}
