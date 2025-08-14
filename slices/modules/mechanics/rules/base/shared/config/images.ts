import { navBarHeight, size, statusBarHeight } from "@shared/config";
import { getContainScale } from "@shared/lib";
import { Dimensions } from "react-native";

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

const view = {
	width: screen.width - size.gap.default * 2,
	height: screen.height - navBarHeight - statusBarHeight - size.gap.default * 2,
};

const scale = getContainScale({
	view,
	box: roundReferenceSize,
});

export const currentRoundReferenceSize = {
	width: roundReferenceSize.width * scale,
	height: roundReferenceSize.height * scale,
};
