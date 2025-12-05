import ChaosOddsJSI from "./ChaosOddsJSI";
import type { ChaosOddsInput } from "./ChaosOddsJSI";

export const ChaosOddsService = {
	count(tokens: ChaosOddsInput[]): number {
		if (!ChaosOddsJSI.count) {
			throw new Error(
				"ChaosOdds JSI module is not available. Please rebuild the app to include native bindings.",
			);
		}
		const jsonString = JSON.stringify(tokens);
		return ChaosOddsJSI.count(jsonString);
	},
};
