import ChaosOddsJSI from "./ChaosOddsJSI";
import type { ChaosOddsInput } from "./ChaosOddsJSI";

export const ChaosOddsService = {
	calculate(
		available: ChaosOddsInput[],
		revealed: ChaosOddsInput[] = [],
	): number {
		if (!ChaosOddsJSI.calculate) {
			throw new Error(
				"ChaosOdds JSI module is not available. Please rebuild the app to include native bindings.",
			);
		}
		const availableJSON = JSON.stringify(available);
		const revealedJSON = JSON.stringify(revealed);
		return ChaosOddsJSI.calculate(availableJSON, revealedJSON);
	},
};
