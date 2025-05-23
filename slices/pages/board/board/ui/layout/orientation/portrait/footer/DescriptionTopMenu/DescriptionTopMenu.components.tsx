import { IconButton } from "@features/haptic";
import { color, size } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
	align-items: center;
	padding: 0px ${size.gap.default}px;
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		color: color.light10,
		fontSize: 28,
		lineHeight: 30,
	},
})`
	height: 48px;
`;
