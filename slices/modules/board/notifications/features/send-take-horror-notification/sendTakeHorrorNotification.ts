import { takeHorror } from "@modules/board/base/entities/base/lib";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker({
	message: "horror.take",
});

export function* sendTakeHorrorNotificationSaga() {
	yield takeEvery(takeHorror.match, worker);
}
