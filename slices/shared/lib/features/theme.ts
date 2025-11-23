import type { TextStyle } from "react-native";
import { activeOpacity, font } from "../../config";

export const getActiveOpacity = (active: boolean, opacity = activeOpacity) => {
	return active ? opacity : 1;
};

export const getFontSize = (style: TextStyle) => {
	return style?.fontSize ?? font.size.default;
};
