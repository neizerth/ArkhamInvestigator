import { getResources } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueIncreaseNotificationWorker } from "../lib";

const worker = createActualValueIncreaseNotificationWorker("resources.get");

export function* sendGetResourcesNotification() {
	yield takeEvery(getResources.match, worker);
}
