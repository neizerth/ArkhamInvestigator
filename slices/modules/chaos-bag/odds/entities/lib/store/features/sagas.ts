import { spawn } from "redux-saga/effects";
import { runChaosOddsPerformanceTestSaga } from "./runChaosOddsPerformanceTest/runChaosOddsPerformanceTestSaga";

export function* chaosBagOddsEntitiesSaga() {
	yield spawn(runChaosOddsPerformanceTestSaga);
}
