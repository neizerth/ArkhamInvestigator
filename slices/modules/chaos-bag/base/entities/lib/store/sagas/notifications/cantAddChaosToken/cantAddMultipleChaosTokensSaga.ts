import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { cantAddMultipleChaosTokens } from "../../../actions";

function* worker({ payload }: ReturnType<typeof cantAddMultipleChaosTokens>) {
	const { type, count } = payload;

	yield put(
		sendNotification({
			local: true,
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
