import { ChaosToken } from "@modules/chaos-bag/base/shared/ui";
import { ContextModal } from "@modules/core/modal/shared/base/ui";
import { ScenarioDifficultySelect } from "@modules/stories/entities/ui";
import { color, size } from "@shared/config";
import { Button } from "@shared/ui";
import { Row } from "@shared/ui";
import { DifficultyTokens } from "@widgets/control/reference-select/ui/ReferenceSelect/ReferenceSelect.components";
import { View } from "react-native";
import styled from "styled-components/native";

export const Container: typeof ContextModal = styled(ContextModal).attrs({
	contentStyle: {
		backgroundColor: color.dark30,
		paddingRight: size.gap.small,
		paddingLeft: size.gap.small,
	},
})`
  flex: 1;
  justify-content: flex-start;
`;

export const Select: typeof ScenarioDifficultySelect = styled(
	ScenarioDifficultySelect,
)`
`;

export const Content: typeof View = styled(View)`
  gap: ${size.gap.default}px
`;

export const Preview: typeof DifficultyTokens = styled(DifficultyTokens)`
`;

export const Token: typeof ChaosToken = styled(ChaosToken)`
  
`;

export const Actions: typeof Row = styled(Row)`
  gap: ${size.gap.default}px
`;

export const Action: typeof Button = styled(Button)`
  flex: 1;
`;

export const Cancel: typeof Action = styled(Action)`
  background-color: ${color.dark20};
`;

export const Ok: typeof Action = styled(Action).attrs({
	textStyle: {
		color: color.text,
	},
	iconStyle: {
		color: color.text,
	},
})`
  background-color: ${color.light10};
`;
