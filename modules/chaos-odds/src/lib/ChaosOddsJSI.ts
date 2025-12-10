// JSI Native Module
// Functions exposed via C++ JSI bindings

export interface ChaosOddsInput {
	token_type: string;
	value: number;
	is_fail: boolean;
	is_success: boolean;
	reveal_count: number;
}

interface ChaosOddsJSI {
	calculate(available: string): string; // returns JSON string with 100x100 matrix
	freeString(ptr: string): void; // frees memory allocated by calculate
}

declare global {
	var ChaosOdds: ChaosOddsJSI | undefined;
}

export default global.ChaosOdds as ChaosOddsJSI;
