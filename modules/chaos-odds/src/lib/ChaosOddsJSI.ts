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
		// Synchronous call - wrap in Promise.resolve for backwards compatibility
		const resultString = jsi.calculate(available, revealed);
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
		const resultString = jsi.findTokens(targets, tokens, params);
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
		const resultString = jsi.calculateItem(
			available,
			revealed,
			skill_value,
			difficulty,
		);
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
