import { font } from "@shared/config";
import { StyleSheet } from "react-native";
import * as C from "./IconNumber.components";
import type { IconNumberComponentProps } from "./IconNumber.types";
export const StrokedIconNumber = ({
	value,
	contentContainerStyle,
	...props
}: IconNumberComponentProps) => {
	const { fontSize = font.size.default } = StyleSheet.flatten(props.style);

	const strokeStyle = [props.style, props.strokeStyle, { fontSize }];

	return (
		<C.Container style={contentContainerStyle}>
			<C.StrokeContainer>
				<C.FillContainer>
					<C.Fill {...props}>{value}</C.Fill>
				</C.FillContainer>
				<C.Outline {...props} style={strokeStyle}>
					{value}
				</C.Outline>
			</C.StrokeContainer>
		</C.Container>
	);
};
