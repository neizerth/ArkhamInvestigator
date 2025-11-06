import { healDamage } from "@modules/board/base/entities/base/lib/store/features/healDamage";
import { takeEvery } from "redux-saga/effects";
import { createActualValueChangeNotificationWorker } from "../lib";

const worker = createActualValueChangeNotificationWorker({
	message: "action.heal",
	selfMessage: "action.heal.self",
	type: "unit",
	unitI18nKey: "plural.accusative.damage",
});

export function* sendHealDamageNotificationSaga() {
	yield takeEvery(healDamage.match, worker);
}
