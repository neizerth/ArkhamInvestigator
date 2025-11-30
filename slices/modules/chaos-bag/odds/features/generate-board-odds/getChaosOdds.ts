import { always, range } from "ramda";
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

export const getChaosOdds = async (options: GetChaosOddsOptions) => {
	const { available, revealed } = options;
	const acc = numericRange.map(getSkillValueRange);
	// const variations = getChaosOddsVariations(options);

	// console.log("variations size", variations.length);

	return acc;
};
