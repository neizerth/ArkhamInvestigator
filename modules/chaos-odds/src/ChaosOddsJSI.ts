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
	add(left: number, right: number): number;
	count(tokens: string): number; // accepts JSON string
	// calculate will be implemented later
	// calculate(config: any): any;
}

declare global {
	var ChaosOdds: ChaosOddsJSI;
}

// Export the global ChaosOdds object
export default global.ChaosOdds;
