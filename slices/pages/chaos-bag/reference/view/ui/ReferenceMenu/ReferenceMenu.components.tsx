import { Button } from "@modules/core/haptic/shared/ui";
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

export const Group: typeof Row = styled(Row)`
	
`;
