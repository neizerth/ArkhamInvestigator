import { cantAddSingleChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof cantAddSingleChaosToken>) {
	const { type, limit, available } = payload;

	const character = chaosToken.character[type];

	yield put(
		sendNotification({
			type: "error",
			message: "chaosBag.cantAddToken",
			data: {
				type,
				character,
				limit,
				available,
				count: 1,
			},
		}),
	);
}

export function* cantAddSingleChaosTokenSaga() {
	yield takeEvery(cantAddSingleChaosToken.match, worker);
}
