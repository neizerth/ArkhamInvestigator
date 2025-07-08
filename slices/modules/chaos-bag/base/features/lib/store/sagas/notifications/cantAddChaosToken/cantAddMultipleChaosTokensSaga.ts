import { cantAddMultipleChaosTokens } from "@modules/chaos-bag/base/entities/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof cantAddMultipleChaosTokens>) {
	const { type, count } = payload;

	yield put(
		sendNotification({
			local: true,
			type: "error",
			message: "chaosBag.cantAddToken",
			data: {
				type,
				count,
			},
		}),
	);
}

export function* cantAddMultipleChaosTokensSaga() {
	yield takeEvery(cantAddMultipleChaosTokens.match, worker);
}
