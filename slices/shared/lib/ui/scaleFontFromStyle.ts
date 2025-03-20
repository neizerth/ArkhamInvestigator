import { font } from "@shared/config";
import { type StyleProp, StyleSheet, type TextStyle } from "react-native";

export const scaleFontFromStyle = (
	scale: number,
	style?: StyleProp<TextStyle>,
) => {
	const styleSheet = StyleSheet.flatten(style);

	const fontSize = styleSheet?.fontSize || font.size.default;

	const scaledFontSize = fontSize * scale;

	return {
		fontSize,
		scaledFontSize,
	};
};
