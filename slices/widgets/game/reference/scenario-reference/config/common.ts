import { size } from "@shared/config";
import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export const scenarioReferenceSize = {
	width: 733,
	height: 1050,
	ratio: 733 / 1050,
};

const currentWidth = window.width - size.gap.default * 2;
const currentHeight = currentWidth / scenarioReferenceSize.ratio;

export const currentScenarioReferenceSize = {
	width: currentWidth,
	height: currentHeight,
};
