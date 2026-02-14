import { spawn } from "redux-saga/effects";
import { watchdogDeadServerSaga } from "./watchdogDeadServerSaga";
import { watchdogPingSaga } from "./watchdogPingSaga";

export function* runTCPServerWatchdogSaga() {
	yield spawn(watchdogPingSaga);
	yield spawn(watchdogDeadServerSaga);
}
