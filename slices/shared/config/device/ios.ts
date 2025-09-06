import * as Device from "expo-device";
import { gt } from "ramda";
import { Platform } from "react-native";

export const createAppleCompare =
	(prefix: string) => (compare: (a: number, b: number) => boolean) => {
		return (version: number) => {
			const { modelId } = Device;
			if (Platform.OS !== "ios") {
				return false;
			}
			if (typeof modelId !== "string") {
				return;
			}
			const modelVersion = +modelId.replace(prefix, "").replace(",", ".");

			if (Number.isNaN(modelVersion)) {
				return false;
			}

			return compare(version, modelVersion);
		};
	};

const iPhone = createAppleCompare("iPhone");

export const iPhoneVersion = {
	gt: iPhone(gt),
};
