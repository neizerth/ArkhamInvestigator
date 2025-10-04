import { Platform } from "react-native";
import { font } from "../../../config";

const top = Platform.OS === "ios" ? 3 : 0;

export const defaultButtonTextStyle = {
	fontSize: font.size.xl,
	lineHeight: font.size.xl,
	top: 3,
};
