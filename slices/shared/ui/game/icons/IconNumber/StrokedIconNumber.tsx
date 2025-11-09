import { StyleSheet } from "react-native";
import { font } from "../../../../config";
import * as C from "./IconNumber.components";
import type { IconNumberComponentProps } from "./IconNumber.types";
export const StrokedIconNumber = ({
	value,
	contentContainerStyle,
	...props
}: IconNumberComponentProps) => {
	const { fontSize = font.size.default } = StyleSheet.flatten(props.style);

	const strokeStyle = [props.style, props.strokeStyle, { fontSize }];

	const containerStyle = {
		height: fontSize,
	};

	return (
		<C.Container style={contentContainerStyle}>
			<C.StrokeContainer style={containerStyle}>
				<C.Fill {...props}>{value}</C.Fill>
				<C.Outline {...props} style={strokeStyle}>
					{value}
				</C.Outline>
			</C.StrokeContainer>
		</C.Container>
	);
};
