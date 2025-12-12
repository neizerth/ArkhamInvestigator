import { ChaosOdds } from "@expo-modules/chaos-odds";
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

export const getChaosOdds = async (options: GetChaosOddsOptions) => {
	const { available } = options;

	const availableTokens = available.map(mapTokenToOddsToken);

	try {
		const odds = ChaosOdds.calculate(availableTokens);
		console.log("chaos odds result:", odds);
	} catch (error) {
		console.warn("ChaosOdds not ready yet, skipping calculation", error);
		return null;
	}

	// const variations = getChaosOddsVariations(options);

	// console.log("variations size", variations.length);
};
