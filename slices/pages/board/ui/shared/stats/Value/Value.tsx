import type { IconNumberProps } from "@shared/ui";
import { memo } from "react";
import { StyleSheet, type ViewProps } from "react-native";
import * as C from "./Value.components";
import { getFontStyle, valueStyle } from "./Value.styles";

export type ValueProps = IconNumberProps & {
	containerStyle?: ViewProps["style"];
};

export const Value = ({ ...props }: ValueProps) => {
	const { value } = props;
	const { color, fontSize } = StyleSheet.flatten(props.style);

	const fontStyle = getFontStyle({
		defaultFontSize: fontSize,
		value,
	});

	const strokeStyle = {
		color,
	};

	return (
		<C.Container>
			<C.Value
				{...props}
				style={[props.style, valueStyle, fontStyle]}
				strokeStyle={[strokeStyle, props.strokeStyle, fontStyle]}
			/>
		</C.Container>
	);
};

export const ValueMemo = memo(Value);
