import { cantRemoveSingleChaosTokenByType } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({
	payload,
}: ReturnType<typeof cantRemoveSingleChaosTokenByType>) {
	const { type, available } = payload;

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
				count: 1,
			},
		}),
	);
}

export function* cantRemoveSingleChaosTokenByTypeSaga() {
	yield takeEvery(cantRemoveSingleChaosTokenByType.match, worker);
}
