import {
	ReanimatedLogLevel,
	configureReanimatedLogger,
} from "react-native-reanimated";

// This is the default configuration
configureReanimatedLogger({
	level: ReanimatedLogLevel.warn,
	strict: false, // Reanimated runs in strict mode by default
});
