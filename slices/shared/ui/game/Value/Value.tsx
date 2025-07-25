import { memo } from "react";
import { StyleSheet } from "react-native";
import type { TextProps } from "react-native";
import type { IconNumberProps } from "../icons";
import * as C from "./Value.components";
import { getFontStyle, valueStyle } from "./Value.styles";

export type ValueProps = IconNumberProps & {
	textStyle?: TextProps["style"];
	sizes?: number[];
	scale?: boolean;
};

export const Value = ({
	stroke = true,
	textStyle,
	scale = true,
	sizes,
	...props
}: ValueProps) => {
	const { value } = props;
	const { color, fontSize } = StyleSheet.flatten(props.style);

	const fontStyle =
		scale &&
		getFontStyle({
			defaultFontSize: fontSize,
			sizes,
			value,
		});

	const strokeStyle = {
		color,
	};

	return (
		<C.Container>
			<C.Value
				{...props}
				style={[props.style, valueStyle, fontStyle, textStyle]}
				strokeStyle={[strokeStyle, props.strokeStyle, fontStyle]}
				stroke={stroke}
			/>
		</C.Container>
	);
};

export const ValueMemo = memo(Value);
