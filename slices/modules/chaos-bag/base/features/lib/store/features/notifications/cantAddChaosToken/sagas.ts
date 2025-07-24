import { spawn } from "redux-saga/effects";
import { cantAddMultipleChaosTokensSaga } from "./cantAddMultipleChaosTokensSaga";
import { cantAddSingleChaosTokenSaga } from "./cantAddSingleChaosTokenSaga";

export function* cantAddChaosTokenNotificationsSaga() {
	yield spawn(cantAddSingleChaosTokenSaga);
	yield spawn(cantAddMultipleChaosTokensSaga);
}
