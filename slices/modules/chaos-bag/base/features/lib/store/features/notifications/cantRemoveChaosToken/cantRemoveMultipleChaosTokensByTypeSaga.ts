import { cantRemoveMultipleChaosTokensByType } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({
	payload,
}: ReturnType<typeof cantRemoveMultipleChaosTokensByType>) {
	const { type, available, count } = payload;

	const character = chaosToken.character[type];

	yield put(
		sendNotification({
			local: true,
			type: "error",
			message: "chaosBag.cantRemoveToken",
			data: {
				type,
				character,
				available,
				count,
			},
		}),
	);
}

export function* cantRemoveMultipleChaosTokensByTypeSaga() {
	yield takeEvery(cantRemoveMultipleChaosTokensByType.match, worker);
}
