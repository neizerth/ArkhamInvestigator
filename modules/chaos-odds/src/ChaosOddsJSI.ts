// JSI Native Module
// Functions exposed via C++ JSI bindings

interface ChaosOddsJSI {
	add(left: number, right: number): number;
	// calculate will be implemented later
	// calculate(config: any): any;
}

declare global {
	var ChaosOdds: ChaosOddsJSI;
}

// Export the global ChaosOdds object
export default global.ChaosOdds;
