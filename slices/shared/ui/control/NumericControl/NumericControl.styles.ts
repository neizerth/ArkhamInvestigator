import { Platform } from "react-native";
import { font } from "../../../config";

const ios = Platform.OS === "ios";

const top = ios ? 3 : -2;

export const defaultButtonTextStyle = {
	fontSize: font.size.xl,
	lineHeight: font.size.xl,
	top,
};
