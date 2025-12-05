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
	calculate(available: string, revealed: string): number; // accepts JSON strings
}

declare global {
	var ChaosOdds: ChaosOddsJSI | undefined;
}

// Export a getter to always access the current global.ChaosOdds value
// This ensures we get the JSI module after it's installed by native code
const ChaosOddsJSIModule = {
	get calculate() {
		return global.ChaosOdds?.calculate;
	},
};

export default ChaosOddsJSIModule as ChaosOddsJSI;
