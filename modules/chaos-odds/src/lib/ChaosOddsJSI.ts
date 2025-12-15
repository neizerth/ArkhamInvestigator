// JSI Native Module
// Functions exposed via C++ JSI bindings

export interface ChaosOddsInput {
	token_type: string;
	value: number;
	is_fail: boolean;
	is_success: boolean;
	reveal_count: number;
}

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
	calculate(available: string, revealed: string): CalculateResult | null;

	/**
	 * Free memory allocated by calculate()
	 * @param id Unique ID returned from calculate() (accepts number or string for backwards compatibility)
	 */
	freeString(id: number | string): void;

	/**
	 * Cancel ongoing calculation
	 */
	cancel(): void;
}

declare global {
	var ChaosOdds: ChaosOddsJSI | undefined;
}

export default global.ChaosOdds as ChaosOddsJSI;
