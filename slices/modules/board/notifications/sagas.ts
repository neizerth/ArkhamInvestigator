import { spawn } from "redux-saga/effects";
import { boardNotificationEntitiesSaga } from "./entities/lib/store/sagas";

export function* boardNotificationsSaga() {
	yield spawn(boardNotificationEntitiesSaga);
}
