import {
	startJSKeepAwake,
	stopJSKeepAwake,
} from "@modules/core/device/entities/keep-awake";
import { stringifyJSON, yieldToEventLoop } from "@shared/lib/util/promise";
import type { ChaosOddsFindTokenTarget, ChaosOddsTokenInput } from "../model";
import ChaosOddsJSI from "./ChaosOddsJSI";

export interface FindTokensOptions {
	targets: ChaosOddsFindTokenTarget[];
	tokens: ChaosOddsTokenInput[];
	reveal_count: number;
	revealed_frost_count: number;
	use_token_reveal?: boolean;
}

// Track in-flight Promise to prevent duplicate calculations with same parameters
let inflightPromise: Promise<number[][] | null> | null = null;
let inflightKey: string | null = null;

// Generate a cache key from calculation parameters
function getCacheKey(
	available: ChaosOddsTokenInput[],
	revealed: ChaosOddsTokenInput[],
): string {
	// Use JSON string as cache key (simple but effective)
	// In production, you might want to use a more efficient hashing algorithm
	return JSON.stringify({ available, revealed });
}

export const ChaosOddsService = {
	async calculate(
		available: ChaosOddsTokenInput[],
		revealed: ChaosOddsTokenInput[] = [],
	): Promise<number[][] | null> {
		const calcStartTime = performance.now();
		// Generate cache key for this calculation
		const cacheKey = getCacheKey(available, revealed);

		// #region agent log
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:32",
				message: "calculate entry",
				data: {
					hasInflightPromise: !!inflightPromise,
					inflightKey,
					matchesCache: inflightKey === cacheKey,
				},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "B",
			}),
		}).catch(() => {});
		// #endregion

		// If there's an in-flight Promise with the same parameters, return it
		if (inflightPromise && inflightKey === cacheKey) {
			// #region agent log
			fetch(
				"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
				{
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						location: "ChaosOddsService.ts:37",
						message: "cache hit - returning existing promise",
						data: { timeSinceStart: performance.now() - calcStartTime },
						timestamp: Date.now(),
						sessionId: "debug-session",
						runId: "run1",
						hypothesisId: "B",
					}),
				},
			).catch(() => {});
			// #endregion
			return inflightPromise;
		}

		// #region agent log
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:41",
				message: "cache miss - creating new calculation",
				data: {
					hasInflightPromise: !!inflightPromise,
					inflightKey,
					timeSinceStart: performance.now() - calcStartTime,
				},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "B",
			}),
		}).catch(() => {});
		// #endregion

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

		startJSKeepAwake();

		// #region agent log
		const beforeNativeCall = performance.now();
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:60",
				message: "before native calculate call",
				data: { timeSinceStart: beforeNativeCall - calcStartTime },
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "A",
			}),
		}).catch(() => {});
		// #endregion

		// Call native function - returns object with id and result, or null if cancelled
		const nativePromise = ChaosOddsJSI.calculate(availableJSON, revealedJSON);

		// #region agent log
		const afterNativeCall = performance.now();
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:62",
				message: "after native calculate call (async)",
				data: {
					timeSinceStart: afterNativeCall - calcStartTime,
					nativeCallDuration: afterNativeCall - beforeNativeCall,
				},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "A",
			}),
		}).catch(() => {});
		// #endregion

		// Create a wrapper Promise that processes the native result and clears in-flight tracking
		const processedPromise = (async () => {
			try {
				// #region agent log
				const beforeAwaitNative = performance.now();
				fetch(
					"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							location: "ChaosOddsService.ts:65",
							message: "before await nativePromise",
							data: { timeSinceStart: beforeAwaitNative - calcStartTime },
							timestamp: Date.now(),
							sessionId: "debug-session",
							runId: "run1",
							hypothesisId: "A",
						}),
					},
				).catch(() => {});
				// #endregion

				// Add then handler to track when Promise resolves
				const promiseWithTracking = nativePromise.then((result) => {
					stopJSKeepAwake();
					// #region agent log
					const promiseResolvedTime = performance.now();
					fetch(
						"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								location: "ChaosOddsService.ts:69-promise-then",
								message: "Promise.then() callback executed - Promise resolved",
								data: {
									timeSinceStart: promiseResolvedTime - calcStartTime,
									timeSinceBeforeAwait: promiseResolvedTime - beforeAwaitNative,
									hasResult: !!result,
								},
								timestamp: Date.now(),
								sessionId: "debug-session",
								runId: "run1",
								hypothesisId: "A",
							}),
						},
					).catch(() => {});
					// #endregion
					return result;
				});

				const calculateResult = await promiseWithTracking;

				// #region agent log
				const afterAwaitNative = performance.now();
				fetch(
					"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							location: "ChaosOddsService.ts:69-await-complete",
							message: "after await nativePromise - Promise resolved",
							data: {
								timeSinceStart: afterAwaitNative - calcStartTime,
								awaitDuration: afterAwaitNative - beforeAwaitNative,
								hasResult: !!calculateResult,
							},
							timestamp: Date.now(),
							sessionId: "debug-session",
							runId: "run1",
							hypothesisId: "A",
						}),
					},
				).catch(() => {});
				// #endregion

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

					// #region agent log
					const beforeReturn = performance.now();
					fetch(
						"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								location: "ChaosOddsService.ts:238-before-return",
								message: "about to return matrix - Promise will resolve",
								data: {
									timeSinceStart: beforeReturn - calcStartTime,
								},
								timestamp: Date.now(),
								sessionId: "debug-session",
								runId: "run1",
								hypothesisId: "A",
							}),
						},
					).catch(() => {});
					// #endregion

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
				// #region agent log
				const finallyTime = performance.now();
				fetch(
					"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
					{
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							location: "ChaosOddsService.ts:111",
							message: "processedPromise finally block",
							data: {
								timeSinceStart: finallyTime - calcStartTime,
								willClearCache: inflightKey === cacheKey,
							},
							timestamp: Date.now(),
							sessionId: "debug-session",
							runId: "run1",
							hypothesisId: "B",
						}),
					},
				).catch(() => {});
				// #endregion
				// Clear in-flight Promise tracking when done
				if (inflightKey === cacheKey) {
					inflightPromise = null;
					inflightKey = null;
					// #region agent log
					fetch(
						"http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df",
						{
							method: "POST",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({
								location: "ChaosOddsService.ts:114",
								message: "cache cleared",
								data: { timeSinceStart: performance.now() - calcStartTime },
								timestamp: Date.now(),
								sessionId: "debug-session",
								runId: "run1",
								hypothesisId: "B",
							}),
						},
					).catch(() => {});
					// #endregion
				}
			}
		})();

		// Store in-flight Promise and key for deduplication
		inflightPromise = processedPromise;
		inflightKey = cacheKey;

		// Wrap the Promise in a way that forces event loop to process resolution handlers
		// This helps prevent event loop blockage when Promise resolves but handlers aren't processed
		// #region agent log
		const beforeAwaitProcessed = performance.now();
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:325-before-await-processed",
				message: "before await processedPromise",
				data: { timeSinceStart: beforeAwaitProcessed - calcStartTime },
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "A",
			}),
		}).catch(() => {});
		// #endregion

		const result = await processedPromise;

		// #region agent log
		const afterAwaitProcessed = performance.now();
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:325-after-await-processed",
				message: "after await processedPromise - Promise awaited",
				data: {
					timeSinceStart: afterAwaitProcessed - calcStartTime,
					awaitDuration: afterAwaitProcessed - beforeAwaitProcessed,
				},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "A",
			}),
		}).catch(() => {});
		// #endregion

		// Force event loop to process any pending microtasks by yielding
		// This ensures Promise resolution handlers are executed even without UI activity
		await yieldToEventLoop();

		return result;
	},

	/**
	 * Cancel ongoing calculation
	 * Call this to request cancellation of a running calculate() operation
	 * NOTE: This cancels the Rust calculation, but does NOT cancel already-created Promises
	 * Promises will still resolve, but with null result if calculation was cancelled
	 */
	cancel(): void {
		// #region agent log
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:131",
				message: "cancel called",
				data: {
					hadInflightPromise: !!inflightPromise,
					hadInflightKey: !!inflightKey,
				},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "D",
			}),
		}).catch(() => {});
		// #endregion
		// Clear in-flight Promise tracking
		inflightPromise = null;
		inflightKey = null;
		// #region agent log
		fetch("http://127.0.0.1:7242/ingest/4756e9c3-5ffd-47b8-90a7-0998864a23df", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				location: "ChaosOddsService.ts:134",
				message: "cancel completed - cache cleared",
				data: {},
				timestamp: Date.now(),
				sessionId: "debug-session",
				runId: "run1",
				hypothesisId: "D",
			}),
		}).catch(() => {});
		// #endregion

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

		startJSKeepAwake();

		// Call native function - returns object with id and result, or null if cancelled
		const calculateResult = await ChaosOddsJSI.findTokens(
			targetsJSON,
			tokensJSON,
			paramsJSON,
		);

		stopJSKeepAwake();

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
