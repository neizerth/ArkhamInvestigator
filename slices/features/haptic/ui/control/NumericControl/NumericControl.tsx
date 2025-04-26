import type { TextProps, ViewProps } from "react-native";
import * as C from "./NumericControl.components";
import { defaultButtonTextStyle } from "./NumericControl.styles";

export type NumericControlProps = ViewProps & {
	onIncrement: () => void;
	onDecrement: () => void;
	buttonStyle?: ViewProps["style"];
	decrementStyle?: ViewProps["style"];
	incrementStyle?: ViewProps["style"];
	minStyle?: ViewProps["style"];
	maxStyle?: ViewProps["style"];

	textStyle?: TextProps["style"];
	decrementTextStyle?: TextProps["style"];
	incrementTextStyle?: TextProps["style"];
	minTextStyle?: TextProps["style"];
	maxTextStyle?: TextProps["style"];

	value?: number;
	min?: number;
	max?: number;
};

export const NumericControl = ({
	onDecrement,
	onIncrement,
	buttonStyle,
	maxStyle,
	minStyle,
	textStyle,
	minTextStyle,
	maxTextStyle,
	decrementStyle,
	decrementTextStyle,
	incrementStyle,
	incrementTextStyle,
	children,
	min = Number.NEGATIVE_INFINITY,
	max = Number.POSITIVE_INFINITY,
	value,
	...props
}: NumericControlProps) => {
	const showMinStyle = typeof value === "number" && value <= min;
	const showMaxStyle = typeof value === "number" && value >= max;
	return (
		<C.Container {...props}>
			<C.Button
				onPress={onDecrement}
				text="–"
				style={[buttonStyle, decrementStyle, showMinStyle && minStyle]}
				textStyle={[
					defaultButtonTextStyle,
					textStyle,
					showMinStyle && minTextStyle,
				]}
			/>
			{children}
			<C.Button
				onPress={onIncrement}
				text="+"
				style={[buttonStyle, incrementStyle, showMaxStyle && maxStyle]}
				textStyle={[
					defaultButtonTextStyle,
					textStyle,
					decrementTextStyle,
					showMaxStyle && maxTextStyle,
				]}
			/>
		</C.Container>
	);
};
