// JSI Native Module
// Functions exposed via C++ JSI bindings

import type { ChaosTokenType } from "slices/modules/chaos-bag/base/shared/model";

export interface ChaosTokenInput {
	type: ChaosTokenType;
	value: number;
	isFail: boolean;
	isSuccess: boolean;
	revealCount: number;
}

interface ChaosOddsJSI {
	add(left: number, right: number): number;
	count(tokens: string): number; // принимает JSON-строку
	// calculate will be implemented later
	// calculate(config: any): any;
}

declare global {
	var ChaosOdds: ChaosOddsJSI;
}

// Export the global ChaosOdds object
export default global.ChaosOdds;
