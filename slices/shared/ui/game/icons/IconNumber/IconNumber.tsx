import { font } from "@shared/config";
import { StyleSheet } from "react-native";
import type { IconNumberProps } from "./IconNumber.types";
import { StrokedIconNumber } from "./StrokedIconNumber";
import { UnstrokedIconNumber } from "./UnstrokedIconNumber";

export type { IconNumberProps };

export const IconNumber = (props: IconNumberProps) => {
	const { stroke } = props;

	const Component = stroke ? StrokedIconNumber : UnstrokedIconNumber;

	const styleSheet = StyleSheet.flatten(props.style);
	const defaultFontSize = styleSheet.fontSize || font.size.default;

	const fontSize = defaultFontSize;
	const style = {
		fontSize,
		lineHeight: fontSize * 0.99,
	};

	return <Component {...props} style={[props.style, style]} />;
};
