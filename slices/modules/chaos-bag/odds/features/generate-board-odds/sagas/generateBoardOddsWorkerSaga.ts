import { selectShowChaosBagOdds } from "@modules/chaos-bag/base/shared/lib";
import type { ReturnAwaited } from "@shared/model";
import { call, select, takeLatest } from "redux-saga/effects";
import { selectBoardChaosOddsTokens } from "../../../entities/lib";
import { createCacheKey } from "../createCacheKey";
import { generateBoardOdds } from "../generateBoardOdds";
import { getChaosOdds } from "../getChaosOdds";

let cacheKey: string | null = null;

const tokensSelector = selectBoardChaosOddsTokens("current");

function* worker() {
	const enabled: ReturnType<typeof selectShowChaosBagOdds> = yield select(
		selectShowChaosBagOdds,
	);

	if (!enabled) {
		return;
	}

	const tokens: ReturnType<typeof tokensSelector> =
		yield select(tokensSelector);

	const currentCacheKey = createCacheKey(tokens);

	if (currentCacheKey === cacheKey) {
		console.log("tokens are the same, skipping");
		return;
	}

	cacheKey = currentCacheKey;

	const revealed = tokens.filter(({ revealId }) => revealId);
	const available = tokens.filter(({ revealId }) => !revealId);

	const startTime = performance.now();

	const odds: ReturnAwaited<typeof getChaosOdds> = yield call(getChaosOdds, {
		available,
		revealed,
	});

	const endTime = performance.now();
	const duration = (endTime - startTime).toFixed(2);
	console.log(`getChaosOdds took ${duration}ms`);

	// console.log("generateBoardOddsSaga");
}

export function* generateBoardOddsWorkerSaga() {
	yield takeLatest(generateBoardOdds.match, worker);
}
