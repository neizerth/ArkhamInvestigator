import { always } from "ramda";
import type { TextProps, ViewProps } from "react-native";
import * as C from "./NumericControl.components";
import { defaultButtonTextStyle } from "./NumericControl.styles";

export type NumericControlProps = ViewProps & {
	onIncrement: () => void;
	onIncrementLongPress?: () => void;
	onDecrement: () => void;
	onDecrementLongPress?: () => void;
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

const disabledCallback = always(false as const);

export const NumericControl = ({
	onDecrement,
	onIncrement,
	onIncrementLongPress,
	onDecrementLongPress,
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
	const disableDecrement = typeof value === "number" && value <= min;
	const disableIncrement = typeof value === "number" && value >= max;

	return (
		<C.Container {...props}>
			<C.Button
				onPress={disableDecrement ? disabledCallback : onDecrement}
				onLongPress={onDecrementLongPress}
				text="–"
				style={[buttonStyle, decrementStyle, disableDecrement && minStyle]}
				textStyle={[
					defaultButtonTextStyle,
					textStyle,
					incrementTextStyle,
					disableDecrement && minTextStyle,
				]}
			/>
			{children}
			<C.Button
				onPress={disableIncrement ? disabledCallback : onIncrement}
				onLongPress={onIncrementLongPress}
				text="+"
				style={[buttonStyle, incrementStyle, disableIncrement && maxStyle]}
				textStyle={[
					defaultButtonTextStyle,
					textStyle,
					decrementTextStyle,
					disableIncrement && maxTextStyle,
				]}
			/>
		</C.Container>
	);
};
