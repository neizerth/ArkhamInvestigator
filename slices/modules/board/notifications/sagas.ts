import { spawn } from "redux-saga/effects";
import { boardNotificationEntitiesSaga } from "./entities/lib/store/sagas";
import { boardNotificationFeaturesSaga } from "./features/sagas";

export function* boardNotificationsSaga() {
	yield spawn(boardNotificationEntitiesSaga);
	yield spawn(boardNotificationFeaturesSaga);
}
