import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib/store";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { put, takeEvery } from "redux-saga/effects";
import { multipleChaosTokensAdded } from "../../../../../../entities/lib/store/actions";

function* worker({ payload }: ReturnType<typeof multipleChaosTokensAdded>) {
	const { type, count, boardId } = payload;

	if (boardId === undefined) {
		return;
	}

	const token = chaosToken.character[type];

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "chaosBag.addToken",
			data: {
				token,
				count,
			},
		}),
	);
}

export function* addMultipleTokenNotificationSaga() {
	yield takeEvery(multipleChaosTokensAdded.match, worker);
}
