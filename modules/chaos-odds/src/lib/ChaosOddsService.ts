import ChaosOddsJSI from "./ChaosOddsJSI";
import type { ChaosOddsInput } from "./ChaosOddsJSI";

export const ChaosOddsService = {
	calculate(available: ChaosOddsInput[]): number[][] {
		if (!ChaosOddsJSI.calculate || !ChaosOddsJSI.freeString) {
			throw new Error(
				"ChaosOdds JSI module is not available. Please rebuild the app to include native bindings.",
			);
		}
		const availableJSON = JSON.stringify(available);

		// Call native function - returns JSON string with 100x100 matrix
		const resultJSON = ChaosOddsJSI.calculate(availableJSON);

		try {
			// Parse JSON to get the matrix
			const matrix: number[][] = JSON.parse(resultJSON);
			return matrix;
		} finally {
			// IMPORTANT: Always free the memory allocated by Rust
			ChaosOddsJSI.freeString(resultJSON);
		}
	},
};
