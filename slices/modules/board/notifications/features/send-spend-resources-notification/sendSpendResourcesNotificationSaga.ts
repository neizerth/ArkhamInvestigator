import { spendResources } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker("resources.spent");

export function* sendSpendResourcesNotificationSaga() {
	yield takeEvery(spendResources.match, worker);
}
