import { sendNotification } from "@modules/core/notifications/shared/lib";
import { put, takeEvery } from "redux-saga/effects";
import { cantAddSingleChaosToken } from "../../../actions";

function* worker({ payload }: ReturnType<typeof cantAddSingleChaosToken>) {
	const { type } = payload;

	yield put(
		sendNotification({
			local: true,
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
