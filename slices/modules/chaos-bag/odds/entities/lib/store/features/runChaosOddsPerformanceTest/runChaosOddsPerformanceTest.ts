import type { ChaosOddsPerformanceTest } from "@modules/chaos-bag/odds/entities/model";
import { createAction } from "@reduxjs/toolkit";

export const runChaosOddsPerformanceTest =
	createAction<ChaosOddsPerformanceTest>(
		"chaosOdds/runChaosOddsPerformanceTest",
	);
