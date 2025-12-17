import { ChaosOdds } from "@expo-modules/chaos-odds";
import { delay } from "@shared/lib";
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

export const getChaosOdds = async (options: GetChaosOddsOptions) => {
	console.log("getChaosOdds started");
	const { available, revealed } = options;

	if (isEmpty(available) && isEmpty(revealed)) {
		return null;
	}

	const availableTokens = available.map(mapTokenToOddsToken);
	const revealedTokens = revealed.map(mapTokenToOddsToken);

	// Cancel any ongoing calculation before starting a new one
	ChaosOdds.cancel();

	// Wait a bit to allow cancellation to propagate and previous calculation to clean up
	// This prevents race conditions and memory leaks when calculations are cancelled
	await delay(10);

	// Increment calculation ID to track this specific calculation
	const currentCalculationId = ++calculationId;

	try {
		const odds = await ChaosOdds.calculate(availableTokens, revealedTokens);

		// Check if this calculation was superseded by a newer one
		// If calculationId changed, a new calculation was started, so ignore this result
		if (currentCalculationId !== calculationId) {
			console.log("getChaosOdds: Calculation superseded, ignoring result");
			return null;
		}

		if (!odds) {
			return null;
		}

		console.log("odds at 1,1", odds[1][1]);
		return odds;
	} catch (error) {
		// Check if this calculation was superseded by a newer one
		if (currentCalculationId !== calculationId) {
			console.log("getChaosOdds: Calculation superseded, ignoring error");
			return null;
		}

		// Calculation was cancelled or failed
		console.error("ChaosOdds calculation error:", error);
		return null;
	}
};
