// JSI Native Module
// Functions exposed via C++ JSI bindings

import {
	getModuleVersion,
	initializeModuleVersion,
	isModuleReloaded,
} from "./hmrProtection";

export type { ChaosOddsInput, TokenTarget, FindTokensParams } from "../model";

/**
 * Result object returned by calculate() function
 * Contains unique ID for memory management and the actual result string
 */
export interface CalculateResult {
	/** Unique ID for memory management - use this ID to free the memory */
	id: number;
	/** JSON string with 100x100 matrix of probabilities */
	result: string;
}

interface ChaosOddsJSI {
	/**
	 * Calculate chaos bag odds
	 * @param available JSON string with available tokens
	 * @param revealed JSON string with revealed tokens (optional, defaults to empty array)
	 * @returns Object with id and result, or null if calculation was cancelled
	 */
	calculate(
		available: string,
		revealed: string,
	): Promise<CalculateResult | null>;

	/**
	 * Free memory allocated by calculate()
	 * @param id Unique ID returned from calculate() (accepts number or string for backwards compatibility)
	 */
	freeString(id: number | string): void;

	/**
	 * Cancel ongoing calculation
	 */
	cancel(): void;

	/**
	 * Find token odds (probability that target tokens appear)
	 * @param targets JSON string with array of TokenTarget
	 * @param tokens JSON string with array of ChaosOddsToken
	 * @param params JSON string with FindTokensParams
	 * @returns Object with id and result (JSON string with number 0-100), or null if calculation was cancelled
	 */
	findTokens(
		targets: string,
		tokens: string,
		params: string,
	): Promise<CalculateResult | null>;
}

declare global {
	var ChaosOdds: ChaosOddsJSI | undefined;
}

// Initialize module version tracking on load
initializeModuleVersion();

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
				return Promise.resolve(null);
			}
			return jsi.calculate(available, revealed);
		},
		freeString: (id: number | string) => {
			if (isModuleReloaded(moduleVersion)) {
				return;
			}
			jsi.freeString(id);
		},
		cancel: () => {
			if (isModuleReloaded(moduleVersion)) {
				return;
			}
			jsi.cancel();
		},
		findTokens: (targets: string, tokens: string, params: string) => {
			if (isModuleReloaded(moduleVersion)) {
				return Promise.resolve(null);
			}
			return jsi.findTokens(targets, tokens, params);
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

export default getChaosOddsJSI() as ChaosOddsJSI;
