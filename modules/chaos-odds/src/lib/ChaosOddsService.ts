import { stringifyJSON } from "@shared/lib/util/promise";
import type { ChaosOddsInput, TokenTarget } from "../model";
import ChaosOddsJSI from "./ChaosOddsJSI";

export interface FindTokensOptions {
	targets: TokenTarget[];
	tokens: ChaosOddsInput[];
	reveal_count: number;
	revealed_frost_count: number;
	use_token_reveal?: boolean;
}

// Track in-flight Promise to prevent duplicate calculations with same parameters
let inflightPromise: Promise<number[][] | null> | null = null;
let inflightKey: string | null = null;

// Generate a cache key from calculation parameters
function getCacheKey(
	available: ChaosOddsInput[],
	revealed: ChaosOddsInput[],
): string {
	// Use JSON string as cache key (simple but effective)
	// In production, you might want to use a more efficient hashing algorithm
	return JSON.stringify({ available, revealed });
}

export const ChaosOddsService = {
	async calculate(
		available: ChaosOddsInput[],
		revealed: ChaosOddsInput[] = [],
	): Promise<number[][] | null> {
		// Generate cache key for this calculation
		const cacheKey = getCacheKey(available, revealed);

		// If there's an in-flight Promise with the same parameters, return it
		if (inflightPromise && inflightKey === cacheKey) {
			return inflightPromise;
		}

		// Cancel previous calculation if parameters changed
		if (inflightPromise && inflightKey !== cacheKey) {
			ChaosOddsService.cancel();
		}

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
		const nativePromise = ChaosOddsJSI.calculate(availableJSON, revealedJSON);

		// Create a wrapper Promise that processes the native result and clears in-flight tracking
		const processedPromise = (async () => {
			try {
				const calculateResult = await nativePromise;

				// Check if this Promise was superseded by a newer one
				if (inflightKey !== cacheKey) {
					return null;
				}

				// If calculation was cancelled, result will be null
				if (calculateResult === null) {
					return null;
				}

				// Validate result string before parsing
				if (
					!calculateResult.result ||
					typeof calculateResult.result !== "string" ||
					calculateResult.result.trim() === "" ||
					calculateResult.result === "undefined" ||
					calculateResult.result === "null"
				) {
					console.error(
						"ChaosOdds: Invalid result string:",
						calculateResult.result,
					);
					return null;
				}

				// CRITICAL: Copy the string immediately before any async operations
				const resultString = String(calculateResult.result);

				try {
					const matrix = JSON.parse(resultString) as number[][];
					ChaosOddsJSI.freeString(calculateResult.id);
					return matrix;
				} catch (error) {
					ChaosOddsJSI.freeString(calculateResult.id);
					console.error(
						"ChaosOdds: JSON parse error:",
						error,
						"Result:",
						resultString?.substring(0, 100),
					);
					return null;
				}
			} finally {
				// Clear in-flight Promise tracking when done
				if (inflightKey === cacheKey) {
					inflightPromise = null;
					inflightKey = null;
				}
			}
		})();

		// Store in-flight Promise and key for deduplication
		inflightPromise = processedPromise;
		inflightKey = cacheKey;

		return await processedPromise;
	},

	/**
	 * Cancel ongoing calculation
	 * Call this to request cancellation of a running calculate() operation
	 * NOTE: This cancels the Rust calculation, but does NOT cancel already-created Promises
	 * Promises will still resolve, but with null result if calculation was cancelled
	 */
	cancel(): void {
		// Clear in-flight Promise tracking
		inflightPromise = null;
		inflightKey = null;

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

		// CRITICAL: Copy the string immediately before any async operations
		// The JSI string may be freed in finally block, so we need a local copy
		const resultString = String(calculateResult.result);

		try {
			// Parse JSON to get the number (0-100) (parseJSON uses yieldToEventLoop which may delay execution)
			const percentage = JSON.parse(resultString) as number;
			ChaosOddsJSI.freeString(calculateResult.id);
			return percentage;
		} catch (error) {
			console.error(
				"ChaosOdds: JSON parse error:",
				error,
				"Result:",
				resultString?.substring(0, 100),
			);
			return null;
		}
	},
};
