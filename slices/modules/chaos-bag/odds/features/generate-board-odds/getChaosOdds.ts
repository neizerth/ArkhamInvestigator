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

export const getChaosOdds = async (
	options: GetChaosOddsOptions,
): Promise<number[][] | null> => {
	const { available, revealed } = options;

	if (isEmpty(available) && isEmpty(revealed)) {
		return null;
	}

	const availableTokens = available.map(mapTokenToOddsToken);
	const revealedTokens = revealed.map(mapTokenToOddsToken);

	// Increment calculation ID to track this specific calculation
	const currentCalculationId = ++calculationId;

	try {
		const odds = await ChaosOdds.calculate(availableTokens, revealedTokens);

		// Check if this calculation was superseded by a newer one
		if (currentCalculationId !== calculationId) {
			return null;
		}

		return odds ?? null;
	} catch (error) {
		// Check if this calculation was superseded by a newer one
		if (currentCalculationId !== calculationId) {
			return null;
		}

		console.error("[getChaosOdds] Calculation error:", error);
		return null;
	}
};
