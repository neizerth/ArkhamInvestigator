import { parseJSON, stringifyJSON } from "@shared/lib/util/promise";
import type { ChaosOddsInput, TokenTarget } from "../model";
import ChaosOddsJSI from "./ChaosOddsJSI";

export interface FindTokensOptions {
	targets: TokenTarget[];
	tokens: ChaosOddsInput[];
	reveal_count: number;
	revealed_frost_count: number;
	use_token_reveal?: boolean;
}

export const ChaosOddsService = {
	async calculate(
		available: ChaosOddsInput[],
		revealed: ChaosOddsInput[] = [],
	): Promise<number[][] | null> {
		if (!ChaosOddsJSI) {
			throw new Error(
				"ChaosOdds JSI module is not available. JSI bindings may not be installed. Please check that the native module is properly initialized.",
			);
		}
		if (!ChaosOddsJSI.calculate || !ChaosOddsJSI.freeString) {
			throw new Error(
				"ChaosOdds JSI module is not available. Please rebuild the app to include native bindings.",
			);
		}

		const availableJSON = await stringifyJSON(available);
		const revealedJSON = await stringifyJSON(revealed);

		// Call native function - returns object with id and result, or null if cancelled
		const calculateResult = await ChaosOddsJSI.calculate(
			availableJSON,
			revealedJSON,
		);

		// If calculation was cancelled, result will be null
		if (calculateResult === null) {
			return null;
		}

		try {
			// Parse JSON to get the matrix
			const matrix = await parseJSON<number[][]>(calculateResult.result);
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
		if (!ChaosOddsJSI) {
			console.warn(
				"ChaosOdds JSI module is not available. JSI bindings may not be installed.",
			);
			return;
		}
		if (!ChaosOddsJSI.cancel) {
			// If cancel is not available, silently ignore (for backwards compatibility)
			return;
		}
		ChaosOddsJSI.cancel();
	},

	/**
	 * Find token odds (probability that target tokens appear)
	 * @param options Options object containing targets, tokens, and calculation parameters
	 * @returns Probability as number (0-100), or null if calculation was cancelled
	 */
	async findTokens(options: FindTokensOptions): Promise<number | null> {
		if (!ChaosOddsJSI) {
			throw new Error(
				"ChaosOdds JSI module is not available. JSI bindings may not be installed. Please check that the native module is properly initialized.",
			);
		}
		if (!ChaosOddsJSI.findTokens || !ChaosOddsJSI.freeString) {
			throw new Error(
				"ChaosOdds JSI module is not available. Please rebuild the app to include native bindings.",
			);
		}

		const {
			targets,
			tokens,
			reveal_count,
			revealed_frost_count,
			use_token_reveal,
		} = options;

		const targetsJSON = await stringifyJSON(targets);
		const tokensJSON = await stringifyJSON(tokens);
		const paramsJSON = await stringifyJSON({
			reveal_count,
			revealed_frost_count,
			use_token_reveal,
		});

		// Call native function - returns object with id and result, or null if cancelled
		const calculateResult = await ChaosOddsJSI.findTokens(
			targetsJSON,
			tokensJSON,
			paramsJSON,
		);

		// If calculation was cancelled, result will be null
		if (calculateResult === null) {
			return null;
		}

		try {
			// Parse JSON to get the number (0-100)
			const percentage = await parseJSON<number>(calculateResult.result);
			return percentage;
		} finally {
			// IMPORTANT: Always free the memory allocated by Rust using the ID
			ChaosOddsJSI.freeString(calculateResult.id);
		}
	},
};
