import { NativeModules, Platform } from "react-native";

// Ensure the ChaosOddsJSI bridge module loads on native platforms
// This module installs the JSI bindings into global.ChaosOdds
if (Platform.OS !== "web") {
	// Reference the module to trigger its initialization
	// The module's setBridge method will install the JSI bindings
	const _ = NativeModules.ChaosOddsJSI;
}

// Reexport the native module. On web, it will be resolved to ChaosOddsModule.web.ts
// and on native platforms to ChaosOddsModule.ts
export { default } from "./src/ChaosOddsModule";
export * from "./src/ChaosOdds.types";

// Export JSI module (Rust + C++ bindings)
export type { ChaosOddsInput as ChaosTokenInput } from "./src/ChaosOddsJSI";
export { ChaosOddsService as ChaosOdds } from "./src/ChaosOddsService";
