import type { NativeModules } from "react-native";

declare global {
	namespace ReactNative {
		interface NativeModulesStatic {
			Grayscale: {
				toGrayscale(base64: string, callback: (result: string) => void): void;
			};
		}
	}
}

export {};
