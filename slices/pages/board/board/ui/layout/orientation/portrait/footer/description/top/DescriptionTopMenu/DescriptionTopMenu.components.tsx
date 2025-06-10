import { IconButton } from "@modules/haptic/shared/ui";
import { color } from "@shared/config";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
	align-items: center;
	padding: 0px;
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		color: color.light10,
		fontSize: 28,
		lineHeight: 30,
	},
})`
	width: 48px;
	height: 48px;
	align-items: center;
`;

export const GoHome: typeof Button = styled(Button).attrs({
	iconStyle: {
		color: color.light10,
		fontSize: 28,
		lineHeight: 30,
		transform: [
			{
				translateX: -3,
			},
		],
	},
})`
	align-items: flex-start;
`;
