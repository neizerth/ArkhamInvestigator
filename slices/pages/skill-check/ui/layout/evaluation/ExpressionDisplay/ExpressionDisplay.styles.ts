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
	signStyle: TextStyle;
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
			lineHeight: textStyle[type].fontSize * 1.1,
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
