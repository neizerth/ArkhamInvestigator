import { Copasetic } from "@assets/fonts";
import { color, font } from "@shared/config";
import type { TextStyle, ViewStyle } from "react-native";

type ReturnStyle = {
	statStyle: TextStyle;
	textStyle: TextStyle;
	signStyle: TextStyle;
	expressionStyle: ViewStyle;
};

export const getExpressionDisplayStyles = (): ReturnStyle => {
	const fontSize = font.size.small;
	const statStyle = {
		fontSize: font.size.small * 0.9,
		lineHeight: fontSize,
	};
	return {
		statStyle,
		textStyle: {
			fontSize,
			color: color.light10,
			fontFamily: Copasetic.regular,
			lineHeight: fontSize * 1.1,
		},
		expressionStyle: {
			justifyContent: "flex-end",
			alignItems: "center",
			gap: 3,
		},
		signStyle: {
			marginLeft: -4,
			marginRight: -4,
		},
	};
};
