import { ChaosOdds } from "@expo-modules/chaos-odds";
import { isEmpty } from "ramda";
import type { ChaosBagOddsToken } from "../../entities/model";
import { mapTokenToChaosOddsTokenInput } from "../../shared/lib";

export type GetChaosOddsOptions = {
	available: ChaosBagOddsToken[];
	revealed: ChaosBagOddsToken[];
};

// Track calculation ID to ignore results from superseded calculations
let calculationId = 0;
let activeCalls = 0;
const activeCallIds = new Set<number>();

export const getChaosOdds = async (
	options: GetChaosOddsOptions,
): Promise<number[][] | null> => {
	const js_start = performance.now();
	const callId = ++calculationId;
	const activeBefore = activeCalls;

	// Cancel ALL previous calculations if there are any active
	if (activeBefore > 0) {
		console.log(
			`⏱️ [JS] Call #${callId}: Cancelling ${activeBefore} previous calculation(s)`,
		);
		// Mark all previous calls as superseded by removing them from activeCallIds
		// This ensures they will be detected as superseded when they complete
		activeCallIds.clear();
		activeCalls = 0; // Reset counter since we're cancelling all
		ChaosOdds.cancel();
		// Wait a bit for cancellation to propagate
		await new Promise((resolve) => setTimeout(resolve, 10));
	}

	// Increment active calls and track this call ID
	activeCalls++;
	activeCallIds.add(callId);

	console.log(
		`⏱️ [JS] getChaosOdds() called #${callId} (active: ${activeCalls})`,
	);

	const { available, revealed } = options;

	if (isEmpty(available) && isEmpty(revealed)) {
		return null;
	}

	const map_start = performance.now();
	const availableTokens = available.map(mapTokenToChaosOddsTokenInput);
	const revealedTokens = revealed.map(mapTokenToChaosOddsTokenInput);
	const map_duration = performance.now() - map_start;
	console.log(`⏱️ [JS] mapTokenToOddsToken took ${map_duration.toFixed(2)} ms`);

	// No need for currentCalculationId - we use activeCallIds Set instead

	try {
		const await_start = performance.now();
		const before_await = performance.now() - js_start;
		console.log(
			`⏱️ [JS] Call #${callId}: Calling ChaosOdds.calculate() (${before_await.toFixed(2)} ms since start)`,
		);
		const odds = await ChaosOdds.calculate({
			revealed: revealedTokens,
			available: availableTokens,
		});
		const await_duration = performance.now() - await_start;

		// Check if this calculation was superseded by a newer one BEFORE logging
		// This prevents logging results from cancelled/superseded calls
		if (!activeCallIds.has(callId)) {
			// This call was cancelled/superseded
			console.log(
				`⏱️ [JS] Call #${callId}: superseded after ${await_duration.toFixed(2)} ms (active: ${activeCalls})`,
			);
			return null;
		}

		// Only log if this call was not superseded
		console.log(
			`⏱️ [JS] Call #${callId}: await ChaosOdds.calculate() took ${await_duration.toFixed(2)} ms`,
		);

		const js_total = performance.now() - js_start;
		console.log(
			`⏱️ [JS] Call #${callId}: getChaosOdds() total time: ${js_total.toFixed(2)} ms (active: ${activeCalls})`,
		);
		return odds ?? null;
	} catch (error) {
		// Check if this calculation was superseded by a newer one
		if (!activeCallIds.has(callId)) {
			// This call was cancelled/superseded
			console.log(
				`⏱️ [JS] Call #${callId}: superseded, returning null (active: ${activeCalls})`,
			);
			return null;
		}

		const js_total = performance.now() - js_start;
		console.error(
			`⏱️ [JS] Call #${callId}: getChaosOdds() error after ${js_total.toFixed(2)} ms (active: ${activeCalls}):`,
			error,
		);
		return null;
	} finally {
		// Ensure cleanup happens exactly once, even if something goes wrong
		// This is the ONLY place where we decrement activeCalls and remove from activeCallIds
		if (activeCallIds.has(callId)) {
			activeCalls = Math.max(0, activeCalls - 1); // Prevent negative values
			activeCallIds.delete(callId);
		}
	}
};
