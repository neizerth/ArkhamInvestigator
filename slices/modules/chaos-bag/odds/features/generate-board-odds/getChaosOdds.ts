import { ChaosOdds } from "@expo-modules/chaos-odds";
import { isEmpty } from "ramda";
import { isNumber } from "ramda-adjunct";
import type { ChaosBagOddsToken } from "../../entities/model";

export type GetChaosOddsOptions = {
	available: ChaosBagOddsToken[];
	revealed: ChaosBagOddsToken[];
};

const mapTokenToOddsToken = (token: ChaosBagOddsToken) => ({
	token_type: token.type,
	value: isNumber(token.value) ? token.value : 0,
	is_fail: token.value === "fail",
	is_success: token.value === "success",
	reveal_count: token.revealCount,
});

// Track calculation ID to ignore results from superseded calculations
let calculationId = 0;
let activeCalls = 0;

export const getChaosOdds = async (
	options: GetChaosOddsOptions,
): Promise<number[][] | null> => {
	const js_start = performance.now();
	const callId = ++calculationId;
	const activeBefore = activeCalls++;

	// Cancel previous calculations if there are any active
	if (activeBefore > 0) {
		console.log(
			`⏱️ [JS] Call #${callId}: Cancelling ${activeBefore} previous calculation(s)`,
		);
		ChaosOdds.cancel();
	}

	console.log(
		`⏱️ [JS] getChaosOdds() called #${callId} (active: ${activeBefore + 1})`,
	);

	const { available, revealed } = options;

	if (isEmpty(available) && isEmpty(revealed)) {
		return null;
	}

	const map_start = performance.now();
	const availableTokens = available.map(mapTokenToOddsToken);
	const revealedTokens = revealed.map(mapTokenToOddsToken);
	const map_duration = performance.now() - map_start;
	console.log(`⏱️ [JS] mapTokenToOddsToken took ${map_duration.toFixed(2)} ms`);

	// Use the callId that was set at function entry
	const currentCalculationId = callId;

	try {
		const await_start = performance.now();
		const before_await = performance.now() - js_start;
		console.log(
			`⏱️ [JS] Call #${callId}: Calling ChaosOdds.calculate() (${before_await.toFixed(2)} ms since start)`,
		);
		const odds = await ChaosOdds.calculate(availableTokens, revealedTokens);
		const await_duration = performance.now() - await_start;

		// Check if this calculation was superseded by a newer one BEFORE logging
		// This prevents logging results from cancelled/superseded calls
		if (currentCalculationId !== calculationId) {
			const activeAfter = --activeCalls;
			console.log(
				`⏱️ [JS] Call #${callId}: superseded after ${await_duration.toFixed(2)} ms (active: ${activeAfter})`,
			);
			return null;
		}

		// Only log if this call was not superseded
		console.log(
			`⏱️ [JS] Call #${callId}: await ChaosOdds.calculate() took ${await_duration.toFixed(2)} ms`,
		);

		const js_total = performance.now() - js_start;
		const activeAfter = --activeCalls;
		console.log(
			`⏱️ [JS] Call #${callId}: getChaosOdds() total time: ${js_total.toFixed(2)} ms (active: ${activeAfter})`,
		);
		return odds ?? null;
	} catch (error) {
		// Check if this calculation was superseded by a newer one
		if (currentCalculationId !== calculationId) {
			const activeAfter = --activeCalls;
			console.log(
				`⏱️ [JS] Call #${callId}: superseded, returning null (active: ${activeAfter})`,
			);
			return null;
		}

		const js_total = performance.now() - js_start;
		const activeAfter = --activeCalls;
		console.error(
			`⏱️ [JS] Call #${callId}: getChaosOdds() error after ${js_total.toFixed(2)} ms (active: ${activeAfter}):`,
			error,
		);
		return null;
	}
};
