import { ChaosOdds } from "@expo-modules/chaos-odds";
import { always, range } from "ramda";
import { isNumber } from "ramda-adjunct";
import type { ChaosBagOddsToken } from "../../entities/model";
// import { getChaosOddsVariations } from "../../entities/lib";

export type GetChaosOddsOptions = {
	available: ChaosBagOddsToken[];
	revealed: ChaosBagOddsToken[];
};

const numericRange = range(0, 100);

const mapZero = always(0);

const getSkillValueRange = () => {
	return numericRange.map(mapZero);
};

const mapTokenToOddsToken = (token: ChaosBagOddsToken) => ({
	token_type: token.type,
	value: isNumber(token.value) ? token.value : 0,
	is_fail: token.value === "fail",
	is_success: token.value === "success",
	reveal_count: token.revealCount,
});

export const getChaosOdds = async (options: GetChaosOddsOptions) => {
	const { available, revealed } = options;

	const oddsTokens = available.map(mapTokenToOddsToken);

	const tokensCount = ChaosOdds.count(oddsTokens);

	console.log("tokensCount", tokensCount);
	// const variations = getChaosOddsVariations(options);

	// console.log("variations size", variations.length);
};
