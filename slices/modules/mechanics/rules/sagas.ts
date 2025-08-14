import { spawn } from "redux-saga/effects";
import { roundTimingSaga } from "./round-timing/sagas";

export function* rulesSaga() {
	yield spawn(roundTimingSaga);
}
