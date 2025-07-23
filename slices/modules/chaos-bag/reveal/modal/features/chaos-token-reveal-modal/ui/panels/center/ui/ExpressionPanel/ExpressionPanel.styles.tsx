import { Copasetic } from "@assets/fonts";
import { color } from "@shared/config";
import type { TextStyle, ViewStyle } from "react-native";

type ReturnStyle = {
	statStyle: TextStyle;
	textStyle: TextStyle;
	signStyle: TextStyle;
	expressionStyle: ViewStyle;
};

export const getExpressionDisplayStyles = (): ReturnStyle => {
	const fontSize = 25;
	const statStyle = {
		fontSize: 23,
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
