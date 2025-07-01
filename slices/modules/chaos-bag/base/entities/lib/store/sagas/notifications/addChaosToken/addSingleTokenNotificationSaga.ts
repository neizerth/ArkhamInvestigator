import { sendInvestigatorNotification } from "@modules/board/notifications/entities/store";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { singleChaosTokenAdded } from "../../../actions";

function* worker({ payload }: ReturnType<typeof singleChaosTokenAdded>) {
	const { boardId } = payload;

	if (boardId === undefined) {
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
