import { healHorror } from "@modules/board/base/entities/base/lib/store/features/healHorror";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker({
	message: "action.heal",
	selfMessage: "action.heal.self",
	type: "unit",
	unitI18nKey: "plural.accusative.horror",
});

export function* sendHealHorrorNotificationSaga() {
	yield takeEvery(healHorror.match, worker);
}
