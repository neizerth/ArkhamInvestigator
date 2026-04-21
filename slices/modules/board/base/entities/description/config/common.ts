import { Dimensions, Platform } from "react-native";

const ios = Platform.OS === "ios";
const screen = Dimensions.get("screen");

const largeScreen = screen.height > 640;

export const DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT = largeScreen
	? ios
		? 80
		: 70
	: 60;

export const DESCRIPTION_NAVBAR_OFFSET = 0;

export const DESCRIPTION_TEXT_UNIT_SIZE = (screen.width * 6) / 100;
