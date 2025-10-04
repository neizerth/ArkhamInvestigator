import * as Device from "expo-device";
import * as semver from "semver";

const toSemver = (version: string) => {
	const start = version.replace(",", ".");
	return `${start}.0`;
};

const createAppleDevice = (devicePrefix: string) => {
	const modelVersion = Device.modelId.replace(devicePrefix, "");
	const version = toSemver(modelVersion);

	const isDevice = Device.modelId.startsWith(devicePrefix);

	return {
		model: {
			iPhoneX: "10,6",
		},
		gte: (deviceVersion: string) => {
			const deviceSemver = toSemver(deviceVersion);
			return isDevice && semver.gte(deviceSemver, version);
		},
		lte: (deviceVersion: string) => {
			const deviceSemver = toSemver(deviceVersion);
			return isDevice && semver.lte(deviceSemver, version);
		},
	};
};

export const iPhone = createAppleDevice("iPhone");
