import { Button } from "@features/haptic";
import { Row } from "@shared/ui";
import styled from "styled-components/native";

export const Container: typeof Row = styled(Row)`
  justify-content: space-between;
`;

export const Action: typeof Button = styled(Button).attrs({
	iconStyle: {
		fontSize: 20,
		lineHeight: 20,
	},
})`
  background-color: transparent;
`;
