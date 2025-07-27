import { IconButton } from "@shared/ui";

import { color, size } from "@shared/config";
import { Row } from "@shared/ui";
import { RoundReference } from "@widgets/game/reference";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${color.modal.background.dark};
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px;
`;

export const Menu: typeof Row = styled(Row)`
  justify-content: flex-end;
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 20,
		lineHeight: 20,
		color: color.light10,
	},
})`
  
`;

export const Reference: typeof RoundReference = styled(RoundReference)`
  
`;
