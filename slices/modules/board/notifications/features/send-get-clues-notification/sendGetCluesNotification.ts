import { getClues } from "@modules/board/base/entities/base/lib";
import { put, takeEvery } from "redux-saga/effects";
import { sendInvestigatorNotification } from "../../entities/lib";

function* worker({ payload }: ReturnType<typeof getClues>) {
	const { boardId, count = 1 } = payload;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "clues.get",
			data: {
				count,
			},
		}),
	);
}

export function* sendGetCluesNotification() {
	yield takeEvery(getClues.match, worker);
}
