import { Platform } from "react-native";

// Ensure the ChaosOdds module loads on native platforms
// The Expo module automatically loads the native library and installs JSI bindings
// via OnCreate lifecycle hook in ChaosOddsModule.kt
if (Platform.OS !== "web") {
	// Module is automatically initialized by Expo Modules system
	// JSI bindings are installed in ChaosOddsModule.onCreate()
}
