import { IconButton } from "@shared/ui";

import { RoundReference } from "@modules/mechanics/rules/round-timing/widgets/round-reference";
import { Row } from "@shared/ui";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof View = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => theme.color.modal.background.dark};
`;

export const Content: typeof View = styled(View)`
  gap: ${({ theme }) => theme.size.gap.default}px;
`;

export const Menu: typeof Row = styled(Row)`
  justify-content: space-between;
`;

export const Button: typeof IconButton = styled(IconButton).attrs(
	({ theme }) => ({
		iconStyle: {
			fontSize: 20,
			lineHeight: 20,
			color: theme.color.light10,
		},
	}),
)`
  
`;

export const Reference: typeof RoundReference = styled(RoundReference)`
  
`;
