import { cantAddSingleChaosToken } from "@modules/chaos-bag/base/entities/lib";
import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof cantAddSingleChaosToken>) {
	const { type } = payload;

	yield put(
		sendNotification({
			local: true,
			type: "error",
			message: "chaosBag.cantAddToken",
			data: {
				type,
				count: 1,
			},
		}),
	);
}

export function* cantAddSingleChaosTokenSaga() {
	yield takeEvery(cantAddSingleChaosToken.match, worker);
}
