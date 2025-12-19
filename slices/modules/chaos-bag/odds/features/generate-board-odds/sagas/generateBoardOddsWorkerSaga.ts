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
	}

	const tokens: ReturnType<typeof tokensSelector> =
		yield select(tokensSelector);

	const currentCacheKey = createCacheKey(tokens);

	// Skip if same cache key
	if (currentCacheKey === cacheKey) {
		return;
	}

	// Skip if calculation is already in progress (after cancellation attempt)
	if (isCalculating) {
		return;
	}

	// Update cache key and calculating flag BEFORE starting calculation to prevent duplicate calls
	// This ensures that if saga is called again with same tokens, it will be skipped
	// Setting isCalculating = true BEFORE yield call() prevents race conditions
	cacheKey = currentCacheKey;
	isCalculating = true;

	const revealed = tokens.filter(({ revealId }) => revealId);
	const available = tokens.filter(({ revealId }) => !revealId);

	try {
		const odds: ReturnAwaited<typeof getChaosOdds> = yield call(getChaosOdds, {
			available,
			revealed,
		});

		// Check if calculation was cancelled (odds will be null)
		if (!isNull(odds)) {
			yield put(setBoardOddsMatrix(odds));
		}
	} finally {
		// Always reset calculating flag, even if calculation failed or was cancelled
		isCalculating = false;
	}
}

export function* generateBoardOddsWorkerSaga() {
	yield takeLatest(generateBoardOdds.match, worker);
}
