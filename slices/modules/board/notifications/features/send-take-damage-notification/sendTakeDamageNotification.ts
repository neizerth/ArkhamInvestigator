import { takeDamage } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker({
	message: "damage.take",
});

export function* sendTakeDamageNotificationSaga() {
	yield takeEvery(takeDamage.match, worker);
}
