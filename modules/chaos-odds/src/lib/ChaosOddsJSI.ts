// JSI Native Module
// Functions exposed via C++ JSI bindings

import {
	getModuleVersion,
	initializeModuleVersion,
	isModuleReloaded,
} from "./hmrProtection";

export type {
	ChaosOddsTokenInput as ChaosOddsInput,
	ChaosOddsFindTokenTarget as TokenTarget,
} from "../model";

/**
 * Result object returned by calculate() function
 * Contains the actual result string (memory is managed automatically by Hermes GC)
 */
export interface CalculateResult {
	/** JSON string with 100x100 matrix of probabilities */
	result: string;
}

interface ChaosOddsJSI {
	/**
	 * Calculate chaos bag odds (synchronous - Hermes-safe)
	 * @param available JSON string with available tokens
	 * @param revealed JSON string with revealed tokens (optional, defaults to empty array)
	 * @returns JSON result string directly (synchronous execution)
	 */
	calculate(available: string, revealed: string): string;

	/**
	 * Calculate token odds (synchronous - Hermes-safe)
	 * @param targets JSON string with array of TokenTarget
	 * @param tokens JSON string with array of ChaosOddsToken
	 * @param params JSON string with FindTokensParams
	 * @returns JSON result string directly (synchronous execution)
	 */
	findTokens(targets: string, tokens: string, params: string): string;

	/**
	 * Calculate item odds (synchronous - Hermes-safe)
	 * @param available JSON string with available tokens
	 * @param revealed JSON string with revealed tokens
	 * @param skill_value Skill value (0-100)
	 * @param difficulty Difficulty value (0-100)
	 * @returns JSON result string directly (synchronous execution)
	 */
	calculateItem(
		available: string,
		revealed: string,
		skill_value: number,
		difficulty: number,
	): string;

	/**
	 * Cancel ongoing calculation
	 */
	cancel(): void;

	/**
	 * Poll result for a task (iOS async pattern)
	 * @param task_id Task ID returned by calculate()
	 * @returns Object with {status: number, result: string} or null if not ready
	 */
	pollResult?(task_id: number): { status: number; result: string } | null;

	/**
	 * Set iOS idle timer disabled state (iOS only, no-op on other platforms)
	 * This prevents the device from going to sleep during long calculations
	 * @param enabled true to disable idle timer (keep awake), false to enable it
	 */
	setKeepAwakeEnabled?(enabled: boolean): void;

	/**
	 * Get version string from Rust (from Cargo.toml)
	 * @returns Version string (e.g., "1.0.1")
	 */
	version(): string;
}

declare global {
	var ChaosOdds: ChaosOddsJSI | undefined;
}

// Initialize module version tracking on load
initializeModuleVersion();

// pollTaskResult REMOVED - synchronous pattern doesn't need polling

/**
 * Creates a HMR-protected wrapper around JSI bindings
 * Validates module version before each call to prevent crashes from stale references
 */
function createProtectedWrapper(
	jsi: ChaosOddsJSI,
	moduleVersion: number,
): ChaosOddsJSI {
	return {
		calculate: (available: string, revealed: string) => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.calculate(available, revealed);
		},
		findTokens: (targets: string, tokens: string, params: string) => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.findTokens(targets, tokens, params);
		},
		calculateItem: (
			available: string,
			revealed: string,
			skill_value: number,
			difficulty: number,
		) => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.calculateItem(available, revealed, skill_value, difficulty);
		},
		cancel: () => {
			if (isModuleReloaded(moduleVersion)) {
				return;
			}
			jsi.cancel();
		},
		pollResult: jsi.pollResult
			? (task_id: number) => {
					if (isModuleReloaded(moduleVersion)) {
						throw new Error("Module was reloaded");
					}
					const pollFn = jsi.pollResult;
					if (pollFn) {
						return pollFn(task_id);
					}
					return null;
				}
			: undefined,
		setKeepAwakeEnabled: jsi.setKeepAwakeEnabled
			? (enabled: boolean) => {
					if (isModuleReloaded(moduleVersion)) {
						return;
					}
					const setKeepAwake = jsi.setKeepAwakeEnabled;
					if (setKeepAwake) {
						setKeepAwake(enabled);
					}
				}
			: undefined,
		version: () => {
			if (isModuleReloaded(moduleVersion)) {
				throw new Error("Module was reloaded");
			}
			return jsi.version();
		},
	};
}

/**
 * Get ChaosOdds JSI bindings with HMR protection
 * Returns undefined if bindings are not available
 */
function getChaosOddsJSI(): ChaosOddsJSI | undefined {
	if (typeof global.ChaosOdds === "undefined") {
		if (__DEV__) {
			console.warn(
				"ChaosOdds JSI bindings are not available. " +
					"This usually means the native module failed to install JSI bindings. " +
					"Check that the native module is properly initialized.",
			);
		}
		return undefined;
	}

	const jsi = global.ChaosOdds;
	const moduleVersion = getModuleVersion();

	return createProtectedWrapper(jsi, moduleVersion);
}

/**
 * Wrapper that creates JS-owned Promise for calculate (synchronous execution wrapped in Promise)
 */
export async function calculateWithPromise(
	available: string,
	revealed: string,
): Promise<CalculateResult | null> {
	const jsi = getChaosOddsJSI();
	if (!jsi) {
		return Promise.resolve(null);
	}

	const moduleVersion = getModuleVersion();
	if (isModuleReloaded(moduleVersion)) {
		return Promise.resolve(null);
	}

	try {
		// Call calculate - on Android it returns string directly, on iOS it returns task_id (number)
		const result = jsi.calculate(available, revealed);

		// Check if result is a number (iOS async pattern - task_id)
		if (typeof result === "number" && jsi.pollResult) {
			// iOS async pattern: poll for result
			return new Promise<CalculateResult | null>((resolve) => {
				const pollInterval = 50; // Poll every 50ms
				const maxAttempts = 200; // Max 10 seconds (200 * 50ms)
				let attempts = 0;

				const poll = () => {
					attempts++;
					const pollFn = jsi.pollResult;
					if (!pollFn) {
						console.error("ChaosOdds: pollResult is not available");
						resolve(null);
						return;
					}
					const polledResult = pollFn(result);

					// pollResult returns an object {status: number, result: string} or null
					if (polledResult !== null && polledResult !== undefined) {
						// Check if it's an object with result property
						if (
							typeof polledResult === "object" &&
							"result" in polledResult &&
							typeof (polledResult as { result: unknown }).result === "string"
						) {
							// Result is ready - extract the string from the object
							const resultObj = polledResult as {
								status: number;
								result: string;
							};
							resolve({
								result: resultObj.result,
							});
						} else if (typeof polledResult === "string") {
							// Fallback: if it's already a string (shouldn't happen, but handle it)
							resolve({
								result: polledResult,
							});
						} else if (attempts >= maxAttempts) {
							// Timeout - result is still not ready
							console.error(
								"ChaosOdds: pollResult timeout after",
								maxAttempts * pollInterval,
								"ms, last result:",
								polledResult,
							);
							resolve(null);
						} else {
							// Continue polling - result is not ready yet (null or object without result)
							setTimeout(poll, pollInterval);
						}
					} else if (attempts >= maxAttempts) {
						// Timeout
						console.error(
							"ChaosOdds: pollResult timeout after",
							maxAttempts * pollInterval,
							"ms",
						);
						resolve(null);
					} else {
						// Continue polling - result is null (not ready yet)
						setTimeout(poll, pollInterval);
					}
				};

				// Start polling
				setTimeout(poll, pollInterval);
			});
		}

		// Android synchronous pattern: result is already a string
		// CRITICAL: Ensure result is always a string
		const resultString = typeof result === "string" ? result : String(result);

		// Log if result was not a string to help debug
		if (typeof result !== "string") {
			console.warn(
				"ChaosOdds: calculate() returned non-string type:",
				typeof result,
				"value:",
				result,
				"converted to:",
				resultString,
			);
		}

		return Promise.resolve({
			result: resultString,
		});
	} catch (error) {
		console.error("ChaosOdds calculate error:", error);
		return Promise.resolve(null);
	}
}

/**
 * Wrapper that creates JS-owned Promise for findTokens (synchronous execution wrapped in Promise)
 */
export async function findTokensWithPromise(
	targets: string,
	tokens: string,
	params: string,
): Promise<CalculateResult | null> {
	const jsi = getChaosOddsJSI();
	if (!jsi) {
		return Promise.resolve(null);
	}

	const moduleVersion = getModuleVersion();
	if (isModuleReloaded(moduleVersion)) {
		return Promise.resolve(null);
	}

	try {
		// Synchronous call - wrap in Promise.resolve for backwards compatibility
		const result = jsi.findTokens(targets, tokens, params);

		// CRITICAL: Ensure result is always a string
		const resultString = typeof result === "string" ? result : String(result);

		if (typeof result !== "string") {
			console.warn(
				"ChaosOdds: findTokens() returned non-string type:",
				typeof result,
				"value:",
				result,
			);
		}

		return Promise.resolve({
			result: resultString,
		});
	} catch (error) {
		console.error("ChaosOdds findTokens error:", error);
		return Promise.resolve(null);
	}
}

/**
 * Wrapper that creates JS-owned Promise for calculateItem (synchronous execution wrapped in Promise)
 */
export async function calculateItemWithPromise(
	available: string,
	revealed: string,
	skill_value: number,
	difficulty: number,
): Promise<CalculateResult | null> {
	const jsi = getChaosOddsJSI();
	if (!jsi) {
		return Promise.resolve(null);
	}

	const moduleVersion = getModuleVersion();
	if (isModuleReloaded(moduleVersion)) {
		return Promise.resolve(null);
	}

	try {
		// Synchronous call - wrap in Promise.resolve for backwards compatibility
		const result = jsi.calculateItem(
			available,
			revealed,
			skill_value,
			difficulty,
		);

		// CRITICAL: Ensure result is always a string
		const resultString = typeof result === "string" ? result : String(result);

		if (typeof result !== "string") {
			console.warn(
				"ChaosOdds: calculateItem() returned non-string type:",
				typeof result,
				"value:",
				result,
			);
		}

		return Promise.resolve({
			result: resultString,
		});
	} catch (error) {
		console.error("ChaosOdds calculateItem error:", error);
		return Promise.resolve(null);
	}
}

// CRITICAL: Don't call getChaosOddsJSI() at import time!
// JSI bindings may be installed AFTER this module is imported.
// Use a function that checks for global.ChaosOdds on every call.
let cachedJSI: ChaosOddsJSI | undefined = undefined;

function getJSI(): ChaosOddsJSI | undefined {
	// Always check if global.ChaosOdds exists
	if (typeof global.ChaosOdds === "undefined") {
		cachedJSI = undefined;
		return undefined;
	}

	// If we have cached JSI, return it
	if (cachedJSI) {
		return cachedJSI;
	}

	// Get fresh JSI wrapper
	cachedJSI = getChaosOddsJSI();
	return cachedJSI;
}

// Create a Proxy that checks for global.ChaosOdds on every access
// The Proxy allows us to check availability dynamically without calling getChaosOddsJSI() at import time
const ChaosOddsJSILazy = new Proxy({} as ChaosOddsJSI, {
	get(_target, prop) {
		// Special property to check if JSI is available
		if (prop === "__available" || prop === Symbol.toPrimitive) {
			return typeof global.ChaosOdds !== "undefined";
		}

		const jsi = getJSI();
		if (!jsi) {
			return undefined;
		}
		// Use double cast through unknown to safely access properties
		const value = (jsi as unknown as Record<string, unknown>)[prop as string];
		if (typeof value === "function") {
			return value.bind(jsi);
		}
		return value;
	},
	has(_target, prop) {
		const jsi = getJSI();
		return jsi ? prop in jsi : false;
	},
	getOwnPropertyDescriptor(_target, prop) {
		const jsi = getJSI();
		if (!jsi) {
			return undefined;
		}
		return Object.getOwnPropertyDescriptor(jsi, prop);
	},
	ownKeys(_target) {
		const jsi = getJSI();
		if (!jsi) {
			return [];
		}
		return Object.keys(jsi);
	},
});

// Make the Proxy falsy when global.ChaosOdds is not available
// This allows `if (!ChaosOddsJSI)` checks to work correctly
Object.defineProperty(ChaosOddsJSILazy, Symbol.toPrimitive, {
	value: (hint: string) => {
		if (hint === "boolean" || hint === "default") {
			return typeof global.ChaosOdds !== "undefined";
		}
		return null;
	},
});

// Add valueOf and toString for boolean coercion
// Use Object.defineProperty to avoid type errors
Object.defineProperty(ChaosOddsJSILazy, "valueOf", {
	value: () => typeof global.ChaosOdds !== "undefined",
	writable: false,
	enumerable: false,
	configurable: false,
});

Object.defineProperty(ChaosOddsJSILazy, "toString", {
	value: () =>
		typeof global.ChaosOdds !== "undefined" ? "[object ChaosOddsJSI]" : "",
	writable: false,
	enumerable: false,
	configurable: false,
});

export default ChaosOddsJSILazy as ChaosOddsJSI;
