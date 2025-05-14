import { Dimensions } from "react-native";

const screen = Dimensions.get("screen");

export const CAN_ALWAYS_SHOW_GAME_TEXT = screen.height > 720;
