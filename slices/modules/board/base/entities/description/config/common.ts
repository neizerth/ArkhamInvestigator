import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

const largeScreen = screen.height > 640;

export const DEFAULT_PORTRAIT_DESCRIPTION_HEIGHT = largeScreen ? 70 : 80;

export const DESCRIPTION_TEXT_UNIT_SIZE = (screen.width * 6) / 100;
