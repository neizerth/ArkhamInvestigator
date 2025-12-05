import ChaosOddsJSI from "./ChaosOddsJSI";
import type { ChaosOddsInput } from "./ChaosOddsJSI";

export const ChaosOddsService = {
	count(tokens: ChaosOddsInput[]): number {
		const jsonString = JSON.stringify(tokens);
		return ChaosOddsJSI.count(jsonString);
	},
};
