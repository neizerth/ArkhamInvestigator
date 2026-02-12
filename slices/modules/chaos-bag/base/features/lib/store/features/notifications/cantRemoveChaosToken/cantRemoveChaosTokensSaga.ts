import { cantRemoveChaosTokens } from "@modules/chaos-bag/base/entities/lib/store/features/remove/removeChaosTokens/cantRemoveChaosTokens";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof cantRemoveChaosTokens>) {
	const { type, available, count } = payload;

	const character = chaosToken.character[type];

	yield put(
		sendNotification({
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

export function* cantRemoveChaosTokensSaga() {
	yield takeEvery(cantRemoveChaosTokens.match, worker);
}
