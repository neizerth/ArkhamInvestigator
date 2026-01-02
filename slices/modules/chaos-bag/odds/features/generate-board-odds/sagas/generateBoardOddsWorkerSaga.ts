import { ChaosOdds } from "@expo-modules/chaos-odds";
import { setBoardOddsMatrix } from "@modules/chaos-bag/odds/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { isNull } from "ramda-adjunct";
import { call, delay, put, select, takeLatest } from "redux-saga/effects";
import { selectBoardChaosOddsTokens } from "../../../entities/lib";
import { createCacheKey } from "../createCacheKey";
import { generateBoardOdds } from "../generateBoardOdds";
import { getChaosOdds } from "../getChaosOdds";

let cacheKey: string | null = null;
let isCalculating = false;

const tokensSelector = selectBoardChaosOddsTokens("current");

function* worker() {
	// Cancel previous calculation if it's still running
	if (isCalculating) {
		ChaosOdds.cancel();
		// Wait a bit for cancellation to propagate
		yield delay(50);
		// Reset cache key when cancelling to ensure next calculation proceeds
		// This prevents stale cache key from blocking recalculation after state changes
		cacheKey = null;
	}

	const tokens: ReturnType<typeof tokensSelector> =
		yield select(tokensSelector);

	const currentCacheKey = createCacheKey(tokens);

	// Skip if same cache key
	if (currentCacheKey === cacheKey) {
		// console.log("same cache key, skip");
		return;
	}

	// Set calculating flag BEFORE starting calculation to prevent race conditions
	// But DON'T set cacheKey yet - we'll set it only after successful calculation
	isCalculating = true;

	const revealed = tokens.filter(({ revealId }) => revealId);
	const available = tokens.filter(({ revealId }) => !revealId);

	if (available.length === 0) {
		// console.log("no available tokens, skip");
		yield put(setBoardOddsMatrix(null));
		return;
	}

	try {
		const start = performance.now();
		const odds: ReturnAwaited<typeof getChaosOdds> = yield call(getChaosOdds, {
			available,
			revealed,
		});
		const end = performance.now() - start;
		console.log("getChaosOdds duration", end, "ms");

		// Check if calculation was cancelled (odds will be null)
		if (!isNull(odds)) {
			yield put(setBoardOddsMatrix(odds));
			// Only update cache key after successful calculation
			// This ensures cache key reflects the actual state that was calculated
			cacheKey = currentCacheKey;
		} else {
			// If calculation was cancelled, don't update cache key
			// This allows recalculation with potentially updated tokens
			console.log("calculation cancelled, not updating cache key");
		}
	} finally {
		// Always reset calculating flag, even if calculation failed or was cancelled
		isCalculating = false;
	}
}

export function* generateBoardOddsWorkerSaga() {
	yield takeLatest(generateBoardOdds.match, worker);
}
