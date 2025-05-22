import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

export const scenarioReferenceSize = {
	width: 733,
	height: 1050,
	ratio: 733 / 1050,
};

const currentHeight = 500;
const currentWidth = currentHeight * scenarioReferenceSize.ratio;

export const currentScenarioReferenceSize = {
	width: currentWidth,
	height: currentHeight,
};
