import { Platform } from "react-native";
import { gte } from "semver";

export const iOSVersion = {
	gte: (version: string) => {
		if (Platform.OS !== "ios") {
			return false;
		}

		const currentVersion = Platform.Version;
		return gte(currentVersion, version);
	},
};
