import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { chaosTokensAdded } from "@modules/chaos-bag/base/entities/lib";
import { chaosToken } from "@modules/chaos-bag/base/shared/config";
import { i18next } from "@modules/core/i18n/shared/config";
import { put, takeEvery } from "redux-saga/effects";

function* worker({ payload }: ReturnType<typeof chaosTokensAdded>) {
	const { boardId, source, tokens } = payload;

	if (boardId === undefined || source !== "effect") {
		return;
	}

	const characters = tokens.map((type) => chaosToken.character[type]);

	const count = tokens.length;

	const key = count === 2 ? "list.separator.two" : "list.separator.multiple";
	const separator = i18next.t(key);

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "chaosBag.addTokens",
			data: {
				tokens: characters.join(separator),
				count,
			},
		}),
	);
}

export function* addChaosTokensNotificationSaga() {
	yield takeEvery(chaosTokensAdded.match, worker);
}
