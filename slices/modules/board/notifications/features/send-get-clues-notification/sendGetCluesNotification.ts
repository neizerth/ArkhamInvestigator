import { getClues } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueIncreaseNotificationWorker } from "../lib";

const worker = createActualValueIncreaseNotificationWorker("clues.get");

export function* sendGetCluesNotification() {
	yield takeEvery(getClues.match, worker);
}
