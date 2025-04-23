import { Copasetic } from "@assets/fonts";
import { color } from "@shared/config";
import type { TextStyle, ViewStyle } from "react-native";
import type { ExpressionDisplayType } from "./ExpressionDisplay.types";

export const typeFontSize = {
	primary: 40,
	secondary: 30,
};

export const statFontSize = {
	primary: 30,
	secondary: 25,
};

export const textStyle = {
	primary: {
		color: color.light10,
		fontSize: typeFontSize.primary,
	},
	secondary: {
		color: color.dark10,
		fontSize: typeFontSize.secondary,
	},
};

type ReturnStyle = {
	statStyle: TextStyle;
	textStyle: TextStyle;
	expressionStyle: ViewStyle;
};

export const getExpressionDisplayStyles = (
	type: ExpressionDisplayType,
): ReturnStyle => {
	const statStyle = {
		fontSize: statFontSize[type],
		lineHeight: statFontSize[type],
	};
	return {
		statStyle,
		textStyle: {
			...textStyle[type],
			fontFamily: Copasetic.regular,
		},
		expressionStyle: {
			justifyContent: "flex-end",
			gap: 3,
		},
	};
};
