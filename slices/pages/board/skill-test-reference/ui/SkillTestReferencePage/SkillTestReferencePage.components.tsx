import { IconButton } from "@shared/ui";

import { SkillTestReference } from "@modules/mechanics/rules/skill-test-timing/widgets/skill-test-reference";
import { color, size } from "@shared/config";
import { Row } from "@shared/ui";
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
  justify-content: space-between;
`;

export const Button: typeof IconButton = styled(IconButton).attrs({
	iconStyle: {
		fontSize: 20,
		lineHeight: 20,
		color: color.light10,
	},
})`
  
`;

export const Reference: typeof SkillTestReference = styled(SkillTestReference)`
  
`;
