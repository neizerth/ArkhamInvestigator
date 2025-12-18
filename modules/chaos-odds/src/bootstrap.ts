import { Platform } from "react-native";

// Ensure the ChaosOdds module loads on native platforms
// JSI bindings are installed via ChaosOddsJSIModulePackage (ReactPackage)
// which is registered in MainApplication.kt
// The Expo Module (ChaosOddsModule) is only for JS API if needed
if (Platform.OS !== "web") {
	// JSI bindings are automatically installed by ReactPackage
	// No need to explicitly load anything here
}
