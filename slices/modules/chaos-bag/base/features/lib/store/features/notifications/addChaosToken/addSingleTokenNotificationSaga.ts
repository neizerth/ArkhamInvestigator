import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib/store";
import { singleChaosTokenAdded } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof singleChaosTokenAdded>) {
	const { boardId, source } = payload;

	if (boardId === undefined || source !== "effect") {
		return;
	}

	const { type } = payload.token;

	const token = chaosToken.character[type];

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "chaosBag.addToken",
			data: {
				token,
				count: 1,
			},
		}),
	);
}

export function* addSingleTokenNotificationSaga() {
	yield takeEvery(singleChaosTokenAdded.match, worker);
}
