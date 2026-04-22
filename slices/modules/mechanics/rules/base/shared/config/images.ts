import { size, statusBarHeight } from "@shared/config";
import { getContainScale } from "@shared/lib";
import { Dimensions, Platform } from "react-native";

const ios = Platform.OS === "ios";

const screen = Dimensions.get("screen");

export const roundReferenceSize = {
	width: 1098,
	height: 1404,
	ratio: 1098 / 1404,
};

export const roundReferencePhaseSize = {
	width: 628,
	height: 704,
	ratio: 628 / 704,
};

const gap = ios ? 0 : 20;

const view = {
	width: screen.width - size.gap.default * 2,
	height: screen.height - gap - statusBarHeight - size.gap.default * 2,
};

const scale = getContainScale({
	view,
	box: roundReferenceSize,
});

export const currentRoundReferenceSize = {
	width: roundReferenceSize.width * scale,
	height: roundReferenceSize.height * scale,
};
