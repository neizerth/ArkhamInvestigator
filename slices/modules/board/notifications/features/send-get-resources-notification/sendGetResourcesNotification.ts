import { getResources } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker({
	message: "resources.get",
});

export function* sendGetResourcesNotification() {
	yield takeEvery(getResources.match, worker);
}
