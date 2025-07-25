import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { spendClues } from "./spendClues";

function* worker({ payload }: ReturnType<typeof spendClues>) {
	const { boardId, count } = payload;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "clues.spent",
			data: {
				count,
			},
		}),
	);
}

export function* spendCluesSaga() {
	yield takeEvery(spendClues.match, worker);
}
