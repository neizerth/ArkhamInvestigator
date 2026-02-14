import { spawn } from "redux-saga/effects";
import { watchdogPingSaga } from "./watchdogPingSaga";

export function* runTCPServerWatchdogSaga() {
	yield spawn(watchdogPingSaga);
}
