import { font } from "@shared/config";
import { StyleSheet } from "react-native";
import type { IconNumberProps } from "./IconNumber.types";
import { StrokedIconNumber } from "./StrokedIconNumber";
import { UnstrokedIconNumber } from "./UnstrokedIconNumber";

export type { IconNumberProps };

export const IconNumber = (props: IconNumberProps) => {
	const { stroke } = props;

	const Component = stroke ? StrokedIconNumber : UnstrokedIconNumber;

	const style = StyleSheet.flatten(props.style);
	const defaultFontSize = style.fontSize || font.size.default;

	const fontSize = defaultFontSize;

	return <Component {...props} style={[props.style, { fontSize }]} />;
};
