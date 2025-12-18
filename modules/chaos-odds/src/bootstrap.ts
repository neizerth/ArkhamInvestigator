import { NativeModules, Platform } from "react-native";

// Ensure the ChaosOdds module loads on native platforms
// JSI bindings are installed via ChaosOddsJSIModule (RCT module)
// which is automatically registered via RCT_EXPORT_MODULE
if (Platform.OS === "ios") {
	// Access the native module to ensure it gets loaded and initialized
	// This will trigger setBridge: and install the JSI bindings
	try {
		const ChaosOddsJSI = NativeModules.ChaosOddsJSI;
		if (ChaosOddsJSI) {
			console.log("ChaosOdds: Native module loaded");
			// Call initialize to ensure the module is fully initialized
			if (typeof ChaosOddsJSI.initialize === "function") {
				ChaosOddsJSI.initialize();
			}
		} else {
			console.warn("ChaosOdds: Native module not found");
		}
	} catch (error) {
		console.warn("ChaosOdds: Error loading native module", error);
	}
}
