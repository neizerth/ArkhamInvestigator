import { Platform } from "react-native";
import { gte } from "semver";

const toSemver = (version: string): string => {
	const parts = version.split(".");
	if (parts.length === 2) {
		return `${parts[0]}.${parts[1]}.0`;
	}
	return version;
};

export const iOSVersion = {
	gte: (version: string) => {
		if (Platform.OS !== "ios") {
			return false;
		}

		const currentVersion = toSemver(Platform.Version);
		const normalizedTargetVersion = toSemver(version);
		return gte(currentVersion, normalizedTargetVersion);
	},
};
