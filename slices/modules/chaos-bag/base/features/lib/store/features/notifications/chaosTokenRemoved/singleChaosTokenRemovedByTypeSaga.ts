import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib/store";
import { chaosTokenRemovedByType } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof chaosTokenRemovedByType>) {
	const { type, boardId, source } = payload;

	if (boardId === undefined || source !== "effect") {
		return;
	}

	const token = chaosToken.character[type];

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "chaosBag.removeToken",
			data: {
				token,
				count: 1,
			},
		}),
	);
}

export function* singleChaosTokenRemovedByTypeSaga() {
	yield takeEvery(chaosTokenRemovedByType.match, worker);
}
