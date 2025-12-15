import ChaosOddsJSI from "./ChaosOddsJSI";
import type { ChaosOddsInput } from "./ChaosOddsJSI";

export const ChaosOddsService = {
	calculate(
		available: ChaosOddsInput[],
		revealed: ChaosOddsInput[] = [],
	): number[][] | null {
		if (!ChaosOddsJSI.calculate || !ChaosOddsJSI.freeString) {
			throw new Error(
				"ChaosOdds JSI module is not available. Please rebuild the app to include native bindings.",
			);
		}
		const availableJSON = JSON.stringify(available);
		const revealedJSON = JSON.stringify(revealed);

		// Call native function - returns object with id and result, or null if cancelled
		const calculateResult = ChaosOddsJSI.calculate(availableJSON, revealedJSON);

		// If calculation was cancelled, result will be null
		if (calculateResult === null) {
			return null;
		}

		try {
			// Parse JSON to get the matrix
			const matrix: number[][] = JSON.parse(calculateResult.result);
			return matrix;
		} finally {
			// IMPORTANT: Always free the memory allocated by Rust using the ID
			ChaosOddsJSI.freeString(calculateResult.id);
		}
	},

	/**
	 * Cancel ongoing calculation
	 * Call this to request cancellation of a running calculate() operation
	 */
	cancel(): void {
		if (!ChaosOddsJSI.cancel) {
			// If cancel is not available, silently ignore (for backwards compatibility)
			return;
		}
		ChaosOddsJSI.cancel();
	},
};
