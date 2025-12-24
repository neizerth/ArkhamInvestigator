import { ChaosOdds } from "@expo-modules/chaos-odds";
import {
	mapTokenToChaosOddsTokenInput,
	selectCompletedChaosOddsPerformanceTests,
	setCompletedChaosOddsPerformanceTests,
} from "@modules/chaos-bag/odds/shared/lib";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { runChaosOddsPerformanceTest } from "./runChaosOddsPerformanceTest";

function* worker({ payload }: ReturnType<typeof runChaosOddsPerformanceTest>) {
	const { id } = payload;
	const workerStartTime = performance.now();

	// #region agent log
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:11",
			message: "worker started",
			data: { testId: id, workerStartTime },
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "C",
		}),
	}).catch(() => {});
	// #endregion

	const completedTests: ReturnType<
		typeof selectCompletedChaosOddsPerformanceTests
	> = yield select(selectCompletedChaosOddsPerformanceTests);

	// #region agent log
	const beforeCancelTime = performance.now();
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:19",
			message: "before cancel",
			data: {
				testId: id,
				timeSinceWorkerStart: beforeCancelTime - workerStartTime,
			},
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "D",
		}),
	}).catch(() => {});
	// #endregion

	// Cancel any previous calculation to clear the cache and ensure clean test conditions
	// This prevents caching from affecting performance measurements
	// takeLatest ensures previous saga task is cancelled, but we also need to clear the Promise cache
	// ChaosOdds.cancel();

	// #region agent log
	const afterCancelTime = performance.now();
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:22",
			message: "after cancel",
			data: {
				testId: id,
				timeSinceWorkerStart: afterCancelTime - workerStartTime,
			},
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "D",
		}),
	}).catch(() => {});
	// #endregion

	// #region agent log
	const afterDelayTime = performance.now();
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:25",
			message: "after delay",
			data: {
				testId: id,
				timeSinceWorkerStart: afterDelayTime - workerStartTime,
			},
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "E",
		}),
	}).catch(() => {});
	// #endregion

	const available = payload.tokens.map(mapTokenToChaosOddsTokenInput);
	const start = performance.now();

	// #region agent log
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:30",
			message: "before calculate call",
			data: { testId: id, timeSinceWorkerStart: start - workerStartTime },
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "A",
		}),
	}).catch(() => {});
	// #endregion

	// #region agent log
	const beforeYieldCall = performance.now();
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:121-before-yield-call",
			message: "before yield call - about to await Promise",
			data: { testId: id, timeSinceStart: beforeYieldCall - start },
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "A",
		}),
	}).catch(() => {});
	// #endregion

	if (payload.type === "all") {
		yield call(ChaosOdds.calculate, {
			available,
		});
	} else {
		yield call(ChaosOdds.calculateItem, {
			available,
			skill_value: payload.skillValue,
			difficulty: payload.difficulty,
		});
	}

	// #region agent log
	const afterYieldCall = performance.now();
	const yieldCallDuration = afterYieldCall - beforeYieldCall;
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:121-after-yield-call",
			message: "after yield call - Promise awaited, saga continuing",
			data: {
				testId: id,
				timeSinceStart: afterYieldCall - start,
				yieldCallDuration,
			},
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "A",
		}),
	}).catch(() => {});
	// #endregion

	const end = performance.now() - start;

	// #region agent log
	fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({
			location: "runChaosOddsPerformanceTestSaga.ts:34",
			message: "after calculate call",
			data: {
				testId: id,
				duration: end,
				timeSinceWorkerStart: end + (start - workerStartTime),
			},
			timestamp: Date.now(),
			sessionId: "debug-session",
			runId: "run1",
			hypothesisId: "A",
		}),
	}).catch(() => {});
	// #endregion

	console.log("getChaosOdds duration", end, "ms");

	yield put(
		setCompletedChaosOddsPerformanceTests({
			...completedTests,
			[id]: end,
		}),
	);
}

export function* runChaosOddsPerformanceTestSaga() {
	// Use takeLatest instead of takeEvery to prevent parallel test execution
	// This ensures each test runs independently without interference
	yield takeLatest(runChaosOddsPerformanceTest.match, worker);
}
