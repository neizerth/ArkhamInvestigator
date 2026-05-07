import { spawn } from "redux-saga/effects";
import { clearLogsSaga } from "./clearLogs/clearLogsSaga";
import { shareLogsSaga } from "./shareLogs/shareLogsSaga";

export function* logEntitiesSaga() {
	yield spawn(clearLogsSaga);
	yield spawn(shareLogsSaga);
}
