import { NativeModules, Platform } from "react-native";

// Ensure the ChaosOddsJSI bridge module loads on native platforms
// This module installs the JSI bindings into global.ChaosOdds
if (Platform.OS !== "web") {
	// Reference the module to trigger its initialization
	// The module's setBridge method will install the JSI bindings
	const _ = NativeModules.ChaosOddsJSI;
}
