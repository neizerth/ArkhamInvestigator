import { getClues } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker("clues.get");

export function* sendGetCluesNotification() {
	yield takeEvery(getClues.match, worker);
}
