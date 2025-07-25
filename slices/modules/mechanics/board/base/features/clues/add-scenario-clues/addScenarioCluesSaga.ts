import { sendInvestigatorNotification } from "@modules/board/notifications/entities/lib";
import { put, takeEvery } from "redux-saga/effects";
import { addScenarioClues } from "./addScenarioClues";

function* worker({ payload }: ReturnType<typeof addScenarioClues>) {
	const { boardId, count } = payload;

	yield put(
		sendInvestigatorNotification({
			boardId,
			message: "clues.scenario.add",
			data: {
				count,
			},
		}),
	);
}

export function* addScenarioCluesSaga() {
	yield takeEvery(addScenarioClues.match, worker);
}
