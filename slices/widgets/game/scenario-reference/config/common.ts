import { size } from "@shared/config";
import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

export const scenarioReferenceSize = {
	width: 733,
	height: 1050,
	ratio: 733 / 1050,
};

const currentWidth = screen.width - size.gap.large * 2;

export const currentScenarioReferenceSize = {
	width: currentWidth,
	height: currentWidth / scenarioReferenceSize.ratio,
};
