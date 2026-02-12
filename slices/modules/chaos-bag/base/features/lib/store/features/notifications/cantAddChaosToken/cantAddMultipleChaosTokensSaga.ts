import { cantAddMultipleChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof cantAddMultipleChaosTokens>) {
	const { type, count, limit, available } = payload;

	const character = chaosToken.character[type];

	yield put(
		sendNotification({
			type: "error",
			message: "chaosBag.cantAddToken",
			data: {
				type,
				count,
				character,
				limit,
				available,
			},
		}),
	);
}

export function* cantAddMultipleChaosTokensSaga() {
	yield takeEvery(cantAddMultipleChaosTokens.match, worker);
}
